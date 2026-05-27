import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Card } from "@/components/ui/card";
import { Radio } from "lucide-react";

export default function CameraViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReceiving, setIsReceiving] = useState(false);

  useEffect(() => {
    // Detecta se está em produção (Render) ou local
    const socketUrl = window.location.origin;
    const socket = io(socketUrl, {
      transports: ["websocket", "polling"]
    });

    socket.on("connect", () => {
      console.log("Conectado ao servidor de vídeo");
      socket.emit("camera:subscribe");
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

    return () => { socket.disconnect(); };
  }, []);

  return (
    <Card className="relative w-full aspect-video bg-black overflow-hidden border-2 border-dashed border-border flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full object-contain" />
      {!isReceiving && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white z-10">
          <Radio className="w-12 h-12 mb-4 animate-pulse text-primary" />
          <p className="font-bold">Aguardando câmera ao vivo...</p>
          <p className="text-xs opacity-70">Abra /camera-transmit no celular</p>
        </div>
      )}
    </Card>
  );
}
