import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Card } from "@/components/ui/card";
import { Radio, Wifi, WifiOff } from "lucide-react";

export default function CameraViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReceiving, setIsReceiving] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(window.location.origin, { transports: ["websocket", "polling"] });

    socket.on("connect", () => {
      setConnected(true);
      console.log("Viewer conectado!");
    });

    socket.on("camera:frame", (frameData) => {
      setIsReceiving(true);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = new Image();
      img.onload = () => {
        if (canvas && ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        }
      };
      img.src = frameData.data;
    });

    socket.on("camera:stop", () => setIsReceiving(false));
    socket.on("disconnect", () => setConnected(false));

    return () => { socket.disconnect(); };
  }, []);

  return (
    <Card className="relative w-full aspect-video bg-black overflow-hidden border-2 border-dashed border-border flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full object-contain" />
      
      {/* Indicador de Conexão no topo */}
      <div className="absolute top-2 right-2 z-20">
        {connected ? <Wifi className="text-green-500 w-4 h-4" /> : <WifiOff className="text-red-500 w-4 h-4" />}
      </div>

      {!isReceiving && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white z-10">
          <Radio className="w-12 h-12 mb-4 animate-pulse text-primary" />
          <p className="font-bold">Aguardando câmera...</p>
          <p className="text-xs opacity-70">Certifique-se que o celular iniciou a transmissão</p>
        </div>
      )}
    </Card>
  );
}
