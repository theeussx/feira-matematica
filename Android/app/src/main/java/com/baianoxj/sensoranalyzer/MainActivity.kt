package com.baianoxj.sensoranalyzer

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.BatteryManager
import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.baianoxj.sensoranalyzer.ui.theme.SensorAnalyzerTheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import java.util.Locale

private const val API_URL_ATUAL = "http://192.168.1.105:4000/api/sensors"

class MainActivity : ComponentActivity() {

    private lateinit var sensorManager: SensorManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager

        enableEdgeToEdge()

        setContent {
            SensorAnalyzerTheme {
                Scaffold(
                    modifier = Modifier.fillMaxSize()
                ) { innerPadding ->
                    SensorAnalyzerApp(
                        context = this,
                        sensorManager = sensorManager,
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@Composable
fun SensorAnalyzerApp(
    context: Context,
    sensorManager: SensorManager,
    modifier: Modifier = Modifier
) {
    val sensorValues = remember { mutableStateMapOf<Int, List<Float>>() }

    val batteryLevel = remember { mutableStateOf(0) }
    val batteryTemp = remember { mutableStateOf(0.0) }
    val batteryStatus = remember { mutableStateOf("Carregando...") }

    val apiEnabled = remember { mutableStateOf(true) }
    val apiStatus = remember { mutableStateOf("Aguardando envio...") }
    val lastSentAt = remember { mutableStateOf("Nunca") }

    val sensors = remember {
        sensorManager.getSensorList(Sensor.TYPE_ALL)
    }

    val mainSensorTypes = listOf(
        Sensor.TYPE_ACCELEROMETER,
        Sensor.TYPE_GYROSCOPE,
        Sensor.TYPE_MAGNETIC_FIELD,
        Sensor.TYPE_LIGHT,
        Sensor.TYPE_PROXIMITY,
        Sensor.TYPE_PRESSURE,
        Sensor.TYPE_GRAVITY,
        Sensor.TYPE_LINEAR_ACCELERATION,
        Sensor.TYPE_ROTATION_VECTOR,
        Sensor.TYPE_AMBIENT_TEMPERATURE
    )

    DisposableEffect(Unit) {
        val listener = object : SensorEventListener {
            override fun onSensorChanged(event: SensorEvent) {
                sensorValues[event.sensor.type] = event.values.toList()
            }

            override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
        }

        mainSensorTypes.forEach { type ->
            val sensor = sensorManager.getDefaultSensor(type)
            if (sensor != null) {
                sensorManager.registerListener(
                    listener,
                    sensor,
                    SensorManager.SENSOR_DELAY_GAME
                )
            }
        }

        onDispose {
            sensorManager.unregisterListener(listener)
        }
    }

    LaunchedEffect(Unit) {
        while (true) {
            val battery = readBatteryInfo(context)

            batteryLevel.value = battery.level
            batteryTemp.value = battery.temperature
            batteryStatus.value = battery.status

            delay(1000)
        }
    }

    LaunchedEffect(apiEnabled.value) {
        while (true) {
            if (apiEnabled.value) {
                val payload = buildSensorPayload(
                    sensorValues = sensorValues,
                    batteryLevel = batteryLevel.value,
                    batteryTemp = batteryTemp.value,
                    batteryStatus = batteryStatus.value
                )

                val result = sendJsonToApi(API_URL_ATUAL, payload)

                apiStatus.value = if (result.ok) {
                    "Enviado com sucesso para API"
                } else {
                    "Erro ao enviar: ${result.message}"
                }

                lastSentAt.value = System.currentTimeMillis().toString()
            } else {
                apiStatus.value = "Envio pausado"
            }

            delay(1000)
        }
    }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    listOf(
                        Color(0xFFEFF4FF),
                        Color(0xFFF8FAFC)
                    )
                )
            )
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            Text(
                text = "Sensor Analyzer",
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF020617)
            )

            Text(
                text = "Dados reais do celular em tempo real",
                style = MaterialTheme.typography.bodyMedium,
                color = Color(0xFF475569)
            )

            FlowCard()

            ApiStatusCard(
                enabled = apiEnabled.value,
                status = apiStatus.value,
                url = API_URL_ATUAL,
                onToggle = {
                    apiEnabled.value = !apiEnabled.value
                }
            )

            InfoCard(title = "Informações do aparelho", color = Color(0xFF2563EB)) {
                InfoLine("Fabricante", Build.MANUFACTURER)
                InfoLine("Modelo", Build.MODEL)
                InfoLine("Android", Build.VERSION.RELEASE)
                InfoLine("SDK", Build.VERSION.SDK_INT.toString())
            }

            InfoCard(title = "Bateria e temperatura", color = Color(0xFF16A34A)) {
                InfoLine("Nível", "${batteryLevel.value}%")
                InfoLine("Temperatura bateria", "${batteryTemp.value} °C")
                InfoLine("Status", batteryStatus.value)
            }

            SensorCard(
                title = "Giroscópio",
                description = "Velocidade angular real nos eixos X, Y e Z",
                values = sensorValues[Sensor.TYPE_GYROSCOPE],
                color = Color(0xFF2563EB),
                emptyText = "Sensor não detectado"
            )

            SensorCard(
                title = "Acelerômetro",
                description = "Aceleração real do aparelho em três dimensões",
                values = sensorValues[Sensor.TYPE_ACCELEROMETER],
                color = Color(0xFFA855F7),
                emptyText = "Sensor não detectado"
            )

            SensorCard(
                title = "Magnetômetro / Bússola",
                description = "Campo magnético usado para orientação",
                values = sensorValues[Sensor.TYPE_MAGNETIC_FIELD],
                color = Color(0xFFEA580C),
                emptyText = "Sensor não detectado"
            )

            SensorCard(
                title = "Sensor de luz",
                description = "Quantidade de luz ambiente em lux",
                values = sensorValues[Sensor.TYPE_LIGHT],
                labels = listOf("Lux"),
                color = Color(0xFFF59E0B),
                emptyText = "Sensor não detectado"
            )

            SensorCard(
                title = "Proximidade",
                description = "Distância de objetos próximos ao sensor frontal",
                values = sensorValues[Sensor.TYPE_PROXIMITY],
                labels = listOf("Distância"),
                color = Color(0xFF0F766E),
                emptyText = "Sensor não detectado"
            )

            SensorCard(
                title = "Gravidade",
                description = "Vetor de gravidade separado do movimento linear",
                values = sensorValues[Sensor.TYPE_GRAVITY],
                color = Color(0xFF334155),
                emptyText = "Sensor não detectado"
            )

            SensorCard(
                title = "Aceleração linear",
                description = "Movimento sem o efeito da gravidade",
                values = sensorValues[Sensor.TYPE_LINEAR_ACCELERATION],
                color = Color(0xFF7C3AED),
                emptyText = "Sensor não detectado"
            )

            SensorCard(
                title = "Rotação",
                description = "Orientação do aparelho calculada pelo Android",
                values = sensorValues[Sensor.TYPE_ROTATION_VECTOR],
                labels = listOf("X", "Y", "Z", "Cos", "Precisão"),
                color = Color(0xFFDC2626),
                emptyText = "Sensor não detectado"
            )

            SensorCard(
                title = "Pressão / Barômetro",
                description = "Pressão atmosférica, se o aparelho tiver sensor",
                values = sensorValues[Sensor.TYPE_PRESSURE],
                labels = listOf("hPa"),
                color = Color(0xFF0891B2),
                emptyText = "Sensor não detectado"
            )

            SensorCard(
                title = "Temperatura ambiente",
                description = "Poucos celulares modernos possuem esse sensor",
                values = sensorValues[Sensor.TYPE_AMBIENT_TEMPERATURE],
                labels = listOf("°C"),
                color = Color(0xFFDB2777),
                emptyText = "Sensor não detectado no aparelho"
            )

            InfoCard(title = "Sensores disponíveis no celular", color = Color(0xFF111827)) {
                Text(
                    text = "Total: ${sensors.size}",
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF020617)
                )

                Spacer(modifier = Modifier.height(8.dp))

                sensors.forEach { sensor ->
                    Text(
                        text = "• ${sensor.name}",
                        style = MaterialTheme.typography.bodySmall,
                        color = Color(0xFF475569)
                    )
                }
            }
        }
    }
}

@Composable
fun FlowCard() {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(22.dp),
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Text(
                text = "Fluxo de Dados em Tempo Real",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF020617)
            )

            FlowStep("Sensores", "Giroscópio, acelerômetro, bateria")
            FlowStep("Processamento", "Monta JSON e calcula valores")
            FlowStep("API / Site", "Envia dados para o painel web")
        }
    }
}

@Composable
fun FlowStep(title: String, subtitle: String) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(
                color = Color(0xFFEFF6FF),
                shape = RoundedCornerShape(14.dp)
            )
            .padding(12.dp)
    ) {
        Text(
            text = title,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF2563EB)
        )

        Text(
            text = subtitle,
            style = MaterialTheme.typography.bodySmall,
            color = Color(0xFF475569)
        )
    }
}

@Composable
fun ApiStatusCard(
    enabled: Boolean,
    status: String,
    url: String,
    onToggle: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(22.dp),
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Envio para API",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF020617)
                )

                Switch(
                    checked = enabled,
                    onCheckedChange = { onToggle() }
                )
            }

            Text(
                text = status,
                color = if (status.contains("sucesso")) Color(0xFF16A34A) else Color(0xFFDC2626),
                fontWeight = FontWeight.SemiBold
            )

            Text(
                text = url,
                style = MaterialTheme.typography.bodySmall,
                color = Color(0xFF475569)
            )
        }
    }
}

@Composable
fun InfoCard(
    title: String,
    color: Color,
    content: @Composable () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(22.dp),
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(44.dp)
                    .background(
                        color = color,
                        shape = RoundedCornerShape(14.dp)
                    )
            )

            Spacer(modifier = Modifier.height(4.dp))

            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF020617)
            )

            content()
        }
    }
}

@Composable
fun InfoLine(label: String, value: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = label,
            fontWeight = FontWeight.SemiBold,
            color = Color(0xFF334155)
        )

        Text(
            text = value,
            color = Color(0xFF020617)
        )
    }
}

@Composable
fun SensorCard(
    title: String,
    description: String,
    values: List<Float>?,
    labels: List<String> = listOf("X", "Y", "Z"),
    color: Color,
    emptyText: String
) {
    InfoCard(title = title, color = color) {
        Text(
            text = description,
            style = MaterialTheme.typography.bodySmall,
            color = Color(0xFF64748B)
        )

        Spacer(modifier = Modifier.height(4.dp))

        if (values == null) {
            Text(
                text = emptyText,
                color = Color(0xFFDC2626),
                fontWeight = FontWeight.SemiBold
            )
        } else {
            values.forEachIndexed { index, value ->
                val label = labels.getOrNull(index) ?: "Valor ${index + 1}"

                InfoLine(
                    label = label,
                    value = String.format(Locale.US, "%.4f", value)
                )
            }
        }
    }
}

data class BatteryInfo(
    val level: Int,
    val temperature: Double,
    val status: String
)

data class ApiResult(
    val ok: Boolean,
    val message: String
)

fun readBatteryInfo(context: Context): BatteryInfo {
    val batteryIntent = context.registerReceiver(
        null,
        IntentFilter(Intent.ACTION_BATTERY_CHANGED)
    )

    val level = batteryIntent?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
    val scale = batteryIntent?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1
    val temp = batteryIntent?.getIntExtra(BatteryManager.EXTRA_TEMPERATURE, 0) ?: 0
    val status = batteryIntent?.getIntExtra(BatteryManager.EXTRA_STATUS, -1) ?: -1

    val percentage = if (level >= 0 && scale > 0) {
        level * 100 / scale
    } else {
        0
    }

    val statusText = when (status) {
        BatteryManager.BATTERY_STATUS_CHARGING -> "Carregando"
        BatteryManager.BATTERY_STATUS_FULL -> "Cheia"
        BatteryManager.BATTERY_STATUS_DISCHARGING -> "Descarregando"
        BatteryManager.BATTERY_STATUS_NOT_CHARGING -> "Não carregando"
        else -> "Desconhecido"
    }

    return BatteryInfo(
        level = percentage,
        temperature = temp / 10.0,
        status = statusText
    )
}

fun buildSensorPayload(
    sensorValues: Map<Int, List<Float>>,
    batteryLevel: Int,
    batteryTemp: Double,
    batteryStatus: String
): JSONObject {
    val json = JSONObject()

    val device = JSONObject()
    device.put("manufacturer", Build.MANUFACTURER)
    device.put("model", Build.MODEL)
    device.put("android", Build.VERSION.RELEASE)
    device.put("sdk", Build.VERSION.SDK_INT)

    val battery = JSONObject()
    battery.put("level", batteryLevel)
    battery.put("temperature", batteryTemp)
    battery.put("status", batteryStatus)

    json.put("device", device)
    json.put("battery", battery)

    json.put("accelerometer", vectorJson(sensorValues[Sensor.TYPE_ACCELEROMETER]))
    json.put("gyroscope", vectorJson(sensorValues[Sensor.TYPE_GYROSCOPE]))
    json.put("magnetometer", vectorJson(sensorValues[Sensor.TYPE_MAGNETIC_FIELD]))
    json.put("gravity", vectorJson(sensorValues[Sensor.TYPE_GRAVITY]))
    json.put("linearAcceleration", vectorJson(sensorValues[Sensor.TYPE_LINEAR_ACCELERATION]))
    json.put("rotation", vectorJson(sensorValues[Sensor.TYPE_ROTATION_VECTOR]))

    val light = JSONObject()
    light.put("lux", sensorValues[Sensor.TYPE_LIGHT]?.getOrNull(0))
    json.put("light", light)

    val proximity = JSONObject()
    proximity.put("distance", sensorValues[Sensor.TYPE_PROXIMITY]?.getOrNull(0))
    json.put("proximity", proximity)

    val pressure = JSONObject()
    pressure.put("hpa", sensorValues[Sensor.TYPE_PRESSURE]?.getOrNull(0))
    json.put("pressure", pressure)

    val ambientTemp = JSONObject()
    ambientTemp.put("temperature", sensorValues[Sensor.TYPE_AMBIENT_TEMPERATURE]?.getOrNull(0))
    json.put("ambientTemperature", ambientTemp)

    json.put("timestamp", System.currentTimeMillis())

    return json
}

fun vectorJson(values: List<Float>?): JSONObject {
    val json = JSONObject()

    json.put("x", values?.getOrNull(0))
    json.put("y", values?.getOrNull(1))
    json.put("z", values?.getOrNull(2))

    if (values != null && values.size > 3) {
        json.put("w", values.getOrNull(3))
    }

    return json
}

suspend fun sendJsonToApi(apiUrl: String, json: JSONObject): ApiResult {
    return withContext(Dispatchers.IO) {
        try {
            val url = URL(apiUrl)
            val connection = url.openConnection() as HttpURLConnection

            connection.requestMethod = "POST"
            connection.setRequestProperty("Content-Type", "application/json; charset=utf-8")
            connection.setRequestProperty("Accept", "application/json")
            connection.connectTimeout = 5000
            connection.readTimeout = 5000
            connection.doOutput = true

            OutputStreamWriter(connection.outputStream, Charsets.UTF_8).use { writer ->
                writer.write(json.toString())
                writer.flush()
            }

            val responseCode = connection.responseCode
            connection.disconnect()

            if (responseCode in 200..299) {
                ApiResult(true, "HTTP $responseCode")
            } else {
                ApiResult(false, "HTTP $responseCode")
            }
        } catch (e: Exception) {
            ApiResult(false, e.message ?: "Erro desconhecido")
        }
    }
}