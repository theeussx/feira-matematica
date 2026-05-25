import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Smartphone } from "lucide-react";

interface SensorData {
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
}

interface SensorSimulatorProps {
  onDataChange?: (data: SensorData) => void;
  isRecording?: boolean;
  onRecordingChange?: (recording: boolean) => void;
}

export default function SensorSimulator({
  onDataChange,
  isRecording = false,
  onRecordingChange,
}: SensorSimulatorProps) {
  const [data, setData] = useState<SensorData>({
    accelerationX: 0,
    accelerationY: 0,
    accelerationZ: 9.8,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Simulação de movimento natural
  useEffect(() => {
    if (!isAnimating) return;

    animationRef.current = setInterval(() => {
      setData((prev) => ({
        accelerationX: Math.sin(Date.now() / 1000) * 5,
        accelerationY: Math.cos(Date.now() / 1500) * 3,
        accelerationZ: 9.8 + Math.sin(Date.now() / 2000) * 2,
        rotationX: Math.sin(Date.now() / 1200) * 0.5,
        rotationY: Math.cos(Date.now() / 1800) * 0.5,
        rotationZ: Math.sin(Date.now() / 2500) * 0.3,
      }));
    }, 100);

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [isAnimating]);

  // Notificar mudanças
  useEffect(() => {
    onDataChange?.(data);
    // Se estiver gravando, enviar para o servidor
    if (isRecording) {
      (async () => {
        try {
          await axios.post("/api/sensors/record", {
            accelerationX: data.accelerationX,
            accelerationY: data.accelerationY,
            accelerationZ: data.accelerationZ,
            rotationX: data.rotationX,
            rotationY: data.rotationY,
            rotationZ: data.rotationZ,
            deviceId: "S20FE-1",
          });
        } catch (e) {
          // não interromper a simulação se o envio falhar
        }
      })();
    }
  }, [data, onDataChange]);

  const handleSliderChange = (axis: keyof SensorData, value: number[]) => {
    setData((prev) => ({
      ...prev,
      [axis]: value[0],
    }));
  };

  const handleReset = () => {
    setData({
      accelerationX: 0,
      accelerationY: 0,
      accelerationZ: 9.8,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
    });
    setIsAnimating(false);
  };

  const handleToggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const handleRecordingToggle = () => {
    onRecordingChange?.(!isRecording);
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-white" />
            <div>
              <CardTitle className="text-white">Simulador de Sensores S20FE</CardTitle>
              <p className="text-sm text-blue-100 mt-1">
                {isRecording ? "🔴 Gravando..." : "⚪ Pronto"}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Controles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Controles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button
              onClick={handleToggleAnimation}
              variant={isAnimating ? "destructive" : "default"}
              className="flex-1"
            >
              {isAnimating ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar Simulação
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar Simulação
                </>
              )}
            </Button>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          <Button
            onClick={handleRecordingToggle}
            className={`w-full ${
              isRecording
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isRecording ? "⏹️ Parar Gravação" : "⏺️ Iniciar Gravação"}
          </Button>
        </CardContent>
      </Card>

      {/* Aceleração */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Aceleração (m/s²)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Eixo X</label>
              <span className="text-sm font-mono bg-blue-100 px-2 py-1 rounded">
                {data.accelerationX.toFixed(2)}
              </span>
            </div>
            <Slider
              value={[data.accelerationX]}
              onValueChange={(value) => handleSliderChange("accelerationX", value)}
              min={-50}
              max={50}
              step={0.1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Eixo Y</label>
              <span className="text-sm font-mono bg-blue-100 px-2 py-1 rounded">
                {data.accelerationY.toFixed(2)}
              </span>
            </div>
            <Slider
              value={[data.accelerationY]}
              onValueChange={(value) => handleSliderChange("accelerationY", value)}
              min={-50}
              max={50}
              step={0.1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Eixo Z</label>
              <span className="text-sm font-mono bg-blue-100 px-2 py-1 rounded">
                {data.accelerationZ.toFixed(2)}
              </span>
            </div>
            <Slider
              value={[data.accelerationZ]}
              onValueChange={(value) => handleSliderChange("accelerationZ", value)}
              min={-50}
              max={50}
              step={0.1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Rotação */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rotação (rad/s)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Eixo X</label>
              <span className="text-sm font-mono bg-purple-100 px-2 py-1 rounded">
                {data.rotationX.toFixed(2)}
              </span>
            </div>
            <Slider
              value={[data.rotationX]}
              onValueChange={(value) => handleSliderChange("rotationX", value)}
              min={-360}
              max={360}
              step={0.1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Eixo Y</label>
              <span className="text-sm font-mono bg-purple-100 px-2 py-1 rounded">
                {data.rotationY.toFixed(2)}
              </span>
            </div>
            <Slider
              value={[data.rotationY]}
              onValueChange={(value) => handleSliderChange("rotationY", value)}
              min={-360}
              max={360}
              step={0.1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Eixo Z</label>
              <span className="text-sm font-mono bg-purple-100 px-2 py-1 rounded">
                {data.rotationZ.toFixed(2)}
              </span>
            </div>
            <Slider
              value={[data.rotationZ]}
              onValueChange={(value) => handleSliderChange("rotationZ", value)}
              min={-360}
              max={360}
              step={0.1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Visualização 3D */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Visualização 3D</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Cubo 3D simulado */}
            <div
              className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg"
              style={{
                transform: `rotateX(${data.rotationX * 10}deg) rotateY(${data.rotationY * 10}deg) rotateZ(${data.rotationZ * 10}deg)`,
                transition: "transform 0.1s linear",
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-2xl">
                S20FE
              </div>
            </div>

            {/* Indicadores de movimento */}
            <div className="absolute top-4 right-4 text-white text-xs space-y-1">
              <div>X: {(data.accelerationX * 10).toFixed(0)}%</div>
              <div>Y: {(data.accelerationY * 10).toFixed(0)}%</div>
              <div>Z: {(data.accelerationZ / 9.8 * 100).toFixed(0)}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900">
            💡 <strong>Dica:</strong> Clique em "Iniciar Simulação" para animar os sensores automaticamente,
            ou use os controles deslizantes para ajustar manualmente. Clique em "Iniciar Gravação" para
            enviar dados ao servidor!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
