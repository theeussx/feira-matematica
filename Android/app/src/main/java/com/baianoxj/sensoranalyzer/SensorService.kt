package com.baianoxj.sensoranalyzer

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Build
import android.os.IBinder
import android.os.PowerManager
import androidx.core.app.NotificationCompat
import kotlinx.coroutines.*
import org.json.JSONObject
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL

class SensorService : Service(), SensorEventListener {

    private lateinit var sensorManager: SensorManager
    private lateinit var wakeLock: PowerManager.WakeLock
    private val serviceScope = CoroutineScope(Dispatchers.IO + SupervisorJob())
    private val sensorValues = mutableMapOf<Int, List<Float>>()
    
    private val API_URL = "https://feira-matematica.onrender.com/api/sensors/record"
    private val CHANNEL_ID = "SensorServiceChannel"

    override fun onCreate() {
        super.onCreate()
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        
        val powerManager = getSystemService(Context.POWER_SERVICE) as PowerManager
        wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "SensorAnalyzer::WakeLock")
        
        createNotificationChannel()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val notification = createNotification()
        startForeground(1, notification)
        
        if (!wakeLock.isHeld) wakeLock.acquire()
        
        registerSensors()
        startDataTransmission()
        
        return START_STICKY
    }

    private fun registerSensors() {
        val types = listOf(
            Sensor.TYPE_ACCELEROMETER,
            Sensor.TYPE_ROTATION_VECTOR
        )
        types.forEach { type ->
            val sensor = sensorManager.getDefaultSensor(type)
            sensor?.let {
                sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_GAME)
            }
        }
    }

    private fun startDataTransmission() {
        serviceScope.launch {
            while (isActive) {
                val payload = buildPayload()
                sendData(payload)
                delay(100) // 10Hz de atualização
            }
        }
    }

    private fun buildPayload(): JSONObject {
        val json = JSONObject()
        val accel = sensorValues[Sensor.TYPE_ACCELEROMETER]
        json.put("accelerationX", accel?.getOrNull(0)?.toDouble() ?: 0.0)
        json.put("accelerationY", accel?.getOrNull(1)?.toDouble() ?: 0.0)
        json.put("accelerationZ", accel?.getOrNull(2)?.toDouble() ?: 0.0)

        val rot = sensorValues[Sensor.TYPE_ROTATION_VECTOR]
        json.put("rotationX", rot?.getOrNull(0)?.toDouble() ?: 0.0)
        json.put("rotationY", rot?.getOrNull(1)?.toDouble() ?: 0.0)
        json.put("rotationZ", rot?.getOrNull(2)?.toDouble() ?: 0.0)

        json.put("deviceId", "S20FE-${Build.MODEL}-${Build.ID}")
        return json
    }

    private suspend fun sendData(json: JSONObject) {
        withContext(Dispatchers.IO) {
            try {
                val url = URL(API_URL)
                val conn = url.openConnection() as HttpURLConnection
                conn.requestMethod = "POST"
                conn.setRequestProperty("Content-Type", "application/json; charset=utf-8")
                conn.doOutput = true
                conn.connectTimeout = 2000
                conn.readTimeout = 2000

                OutputStreamWriter(conn.outputStream, Charsets.UTF_8).use { 
                    it.write(json.toString())
                }
                conn.responseCode
                conn.disconnect()
            } catch (e: Exception) {
                // Silencioso em background
            }
        }
    }

    override fun onSensorChanged(event: SensorEvent) {
        sensorValues[event.sensor.type] = event.values.toList()
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "Sensor Analyzer Service",
                NotificationManager.IMPORTANCE_LOW
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(serviceChannel)
        }
    }

    private fun createNotification(): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Sensor Analyzer Ativo")
            .setContentText("Enviando dados para o site em tempo real...")
            .setSmallIcon(android.R.drawable.ic_menu_info_details)
            .build()
    }

    override fun onDestroy() {
        super.onDestroy()
        serviceScope.cancel()
        sensorManager.unregisterListener(this)
        if (wakeLock.isHeld) wakeLock.release()
    }

    override fun onBind(intent: Intent?): IBinder? = null
}