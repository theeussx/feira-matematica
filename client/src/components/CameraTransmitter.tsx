import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Loader2 } from "lucide-react";

export default function CameraTransmitter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef<any>(null);

  const start = async () => {
    try {
      setLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment", width: 640, height: 480 } 
      });
      
      if (videoRef.current) videoRef.current.srcObject = stream;
      
      socketRef.current = io(window.location.origin, {
        transports: ["websocket", "polling"]
      });

      setStreaming(true);
      setLoading(false);
      
      const send = () => {
        if (!videoRef.current || videoRef.current.paused || videoRef.current.ended) return;
        const canvas = canvasRef.current;
        if (canvas && videoRef.current) {
          const ctx = canvas.getContext("2d");
          canvas.width = 320; // Resolução menor para garantir fluidez
          canvas.height = 240;
          ctx?.drawImage(videoRef.current, 0, 0, 320, 240);
          socketRef.current.emit("camera:frame", { 
            data: canvas.toDataURL("image/jpeg", 0.4) // Compressão de 40%
          });
        }
        if (socketRef.current?.connected) {
          setTimeout(send, 100); // 10 FPS
        }
      };
      send();
    } catch (err) {
      alert("Erro ao acessar câmera: " + err);
      setLoading(false);
    }
  };

  const stop = () => {
    setStreaming(false);
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
    }
    socketRef.current?.disconnect();
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <video ref={videoRef} autoPlay playsInline muted className="w-full rounded-lg bg-black border" />
      <canvas ref={canvasRef} className="hidden" />
      <Button 
        onClick={streaming ? stop : start} 
        className="w-full py-6 text-lg" 
        variant={streaming ? "destructive" : "default"}
        disabled={loading}
      >
        {loading ? <Loader2 className="mr-2 animate-spin" /> : (streaming ? <VideoOff className="mr-2" /> : <Video className="mr-2" />)}
        {streaming ? "Parar Transmissão" : "Iniciar Transmissão"}
      </Button>
    </div>
  );
}
