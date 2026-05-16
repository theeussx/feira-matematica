package com.feira.s20fesensor

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import kotlin.concurrent.thread

class MainActivity : AppCompatActivity( ), SensorEventListener {
    
    private lateinit var sensorManager: SensorManager
    private var accelerometer: Sensor? = null
    private var gyroscope: Sensor? = null
    
    private var accelerationX = 0f
    private var accelerationY = 0f
    private var accelerationZ = 0f
    private var rotationX = 0f
    private var rotationY = 0f
    private var rotationZ = 0f
    
    private lateinit var statusText: TextView
    private lateinit var dataText: TextView
    private lateinit var toggleButton: Button
    
    private var isRecording = false
    private val client = OkHttpClient()
    private val gson = Gson()
    
    // Usa SERVER_URL definido em BuildConfig (defina no build.gradle)
    private val SERVER_URL = BuildConfig.SERVER_URL + "/api/sensors/record"
    private val DEVICE_ID = "S20FE-${android.os.Build.SERIAL}"
    
    override fun onCreate(savedInstanceState: Bundle? ) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        statusText = findViewById(R.id.statusText)
        dataText = findViewById(R.id.dataText)
        toggleButton = findViewById(R.id.toggleButton)
        
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        gyroscope = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)
        
        toggleButton.setOnClickListener {
            isRecording = !isRecording
            if (isRecording) {
                startRecording()
            } else {
                stopRecording()
            }
        }
    }
    
    private fun startRecording() {
        statusText.text = "Status: GRAVANDO ✓"
        toggleButton.text = "Parar"
        sensorManager.registerListener(this, accelerometer, SensorManager.SENSOR_DELAY_NORMAL)
        sensorManager.registerListener(this, gyroscope, SensorManager.SENSOR_DELAY_NORMAL)
    }
    
    private fun stopRecording() {
        statusText.text = "Status: PARADO"
        toggleButton.text = "Iniciar"
        sensorManager.unregisterListener(this)
    }
    
    override fun onSensorChanged(event: SensorEvent?) {
        if (event == null) return
        
        when (event.sensor.type) {
            Sensor.TYPE_ACCELEROMETER -> {
                accelerationX = event.values[0]
                accelerationY = event.values[1]
                accelerationZ = event.values[2]
            }
            Sensor.TYPE_GYROSCOPE -> {
                rotationX = event.values[0]
                rotationY = event.values[1]
                rotationZ = event.values[2]
            }
        }
        
        updateUI()
        sendDataToServer()
    }
    
    private fun updateUI() {
        dataText.text = """
            Aceleração:
            X: ${String.format("%.2f", accelerationX)} m/s²
            Y: ${String.format("%.2f", accelerationY)} m/s²
            Z: ${String.format("%.2f", accelerationZ)} m/s²
            
            Rotação:
            X: ${String.format("%.2f", rotationX)} rad/s
            Y: ${String.format("%.2f", rotationY)} rad/s
            Z: ${String.format("%.2f", rotationZ)} rad/s
        """.trimIndent()
    }
    
    private fun sendDataToServer() {
        thread {
            try {
                val sensorData = mapOf(
                    "accelerationX" to accelerationX,
                    "accelerationY" to accelerationY,
                    "accelerationZ" to accelerationZ,
                    "rotationX" to rotationX,
                    "rotationY" to rotationY,
                    "rotationZ" to rotationZ,
                    "deviceId" to DEVICE_ID
                )
                
                val json = gson.toJson(sensorData)
                val body = json.toRequestBody("application/json".toMediaType())
                
                val request = Request.Builder()
                    .url(SERVER_URL)
                    .post(body)
                    .build()
                
                client.newCall(request).execute().use { response ->
                    if (!response.isSuccessful) {
                        runOnUiThread {
                            statusText.text = "Status: ERRO ${response.code}"
                        }
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
                runOnUiThread {
                    statusText.text = "Status: ERRO CONEXÃO"
                }
            }
        }
    }
    
    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
    
    override fun onDestroy() {
        super.onDestroy()
        sensorManager.unregisterListener(this)
    }
}