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
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment", width: 480, height: 360 } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
      
      socketRef.current = io(window.location.origin, { transports: ["websocket", "polling"] });
      setStreaming(true);
      
      const sendFrame = () => {
        if (!socketRef.current?.connected || !videoRef.current) return;
        const canvas = canvasRef.current;
        if (canvas && videoRef.current) {
          const ctx = canvas.getContext("2d");
          canvas.width = 320;
          canvas.height = 240;
          ctx?.drawImage(videoRef.current, 0, 0, 320, 240);
          socketRef.current.emit("camera:frame", { 
            data: canvas.toDataURL("image/jpeg", 0.3) // Qualidade baixa para não travar
          });
        }
        setTimeout(sendFrame, 200); // 5 FPS - Começamos lento para testar
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
      <video ref={videoRef} autoPlay playsInline muted className="w-full rounded-lg bg-black border" />
      <canvas ref={canvasRef} className="hidden" />
      <Button onClick={streaming ? stop : start} className="w-full py-8 text-xl" variant={streaming ? "destructive" : "default"}>
        {streaming ? <VideoOff className="mr-2" /> : <Video className="mr-2" />}
        {streaming ? "PARAR AGORA" : "INICIAR CÂMERA"}
      </Button>
    </div>
  );
}
