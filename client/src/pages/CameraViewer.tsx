import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Card } from "../components/ui/card";
import { Radio } from "lucide-react";

export default function CameraViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReceiving, setIsReceiving] = useState(false);

  useEffect(() => {
    const socket = io(window.location.origin);
    socket.on("connect", () => socket.emit("camera:subscribe"));
    socket.on("camera:frame", (frameData) => {
      setIsReceiving(true);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = new Image();
      img.onload = () => {
        if (canvas) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
        }
      };
      img.src = frameData.data;
    });
    socket.on("camera:stop", () => setIsReceiving(false));
    return () => { socket.disconnect(); };
  }, []);

  return (
    <Card className="relative w-full aspect-video bg-black overflow-hidden border-2 border-dashed border-border">
      <canvas ref={canvasRef} className="w-full h-full object-contain" />
      {!isReceiving && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white">
          <Radio className="w-12 h-12 mb-4 animate-pulse text-primary" />
          <p>Aguardando câmera ao vivo...</p>
        </div>
      )}
    </Card>
  );
}
