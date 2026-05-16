plugins {
    id("com.android.application")
    id("kotlin-android")
}

android {
    compileSdk = 34
    
    defaultConfig {
        applicationId = "com.feira.s20fesensor"
        minSdk = 21
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
        // URL do servidor (padrão) - edite conforme necessário
        buildConfigField("String", "SERVER_URL", "\"https://seu-dominio.manus.space\"")
    }
    
    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }
    
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    implementation("com.squareup.okhttp3:okhttp:4.11.0" )
    implementation("com.google.code.gson:gson:2.10.1")
}