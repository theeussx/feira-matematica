import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Card } from "@/components/ui/card";
import { Radio } from "lucide-react";

export default function CameraViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReceiving, setIsReceiving] = useState(false);

  useEffect(() => {
    // RE-ADICIONADO: polling para estabilidade
    const socket = io(window.location.origin, { 
      transports: ["websocket", "polling"] 
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
    <Card className="relative w-full aspect-video bg-black overflow-hidden border-none flex items-center justify-center min-h-[300px]">
      {/* O segredo da tela cheia: w-full h-full + object-cover */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover"
        style={{ width: '100%', height: '100%' }}
      />
      
      {isReceiving && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full" /> AO VIVO HD
        </div>
      )}

      {!isReceiving && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white z-10">
          <Radio className="w-10 h-10 mb-4 animate-pulse text-primary" />
          <p className="font-bold text-sm tracking-widest">AGUARDANDO SINAL...</p>
        </div>
      )}
    </Card>
  );
}
