import { useRef, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Loader2 } from "lucide-react";

export default function CameraTransmitter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);
  const socketRef = useRef<any>(null);

  const start = async () => {
    try {
      // Pedindo resolução HD para o celular
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
      
      socketRef.current = io(window.location.origin, { transports: ["websocket"] });
      setStreaming(true);
      
      const sendFrame = () => {
        if (!socketRef.current?.connected || !videoRef.current || !streaming) return;
        const canvas = canvasRef.current;
        if (canvas && videoRef.current) {
          const ctx = canvas.getContext("2d");
          // Resolução de envio balanceada para 30fps não travar
          canvas.width = 640; 
          canvas.height = 360;
          ctx?.drawImage(videoRef.current, 0, 0, 640, 360);
          
          socketRef.current.emit("camera:frame", { 
            data: canvas.toDataURL("image/jpeg", 0.6) // Qualidade 60% (ótimo equilíbrio)
          });
        }
        // 33ms = Aproximadamente 30 FPS
        requestAnimationFrame(() => setTimeout(sendFrame, 33));
      };
      
      socketRef.current.on("connect", sendFrame);
    } catch (err) {
      alert("Erro na câmera: " + err);
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
      <video ref={videoRef} autoPlay playsInline muted className="w-full rounded-lg bg-black border shadow-xl" />
      <canvas ref={canvasRef} className="hidden" />
      <Button onClick={streaming ? stop : start} className="w-full py-8 text-xl font-bold shadow-lg" variant={streaming ? "destructive" : "default"}>
        {streaming ? <VideoOff className="mr-2" /> : <Video className="mr-2" />}
        {streaming ? "ENCERRAR" : "TRANSMITIR EM HD"}
      </Button>
    </div>
  );
}
