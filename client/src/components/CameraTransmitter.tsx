import { useRef, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "../components/ui/button";
import { Video, VideoOff } from "lucide-react";

export default function CameraTransmitter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);
  const socketRef = useRef<any>(null);
  const activeRef = useRef(false); // Ref para controle preciso do loop

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
      
      // RE-ADICIONADO: polling para garantir que conecte sempre
      socketRef.current = io(window.location.origin, { 
        transports: ["websocket", "polling"] 
      });
      
      activeRef.current = true;
      setStreaming(true);
      
      const sendFrame = () => {
        if (!activeRef.current || !videoRef.current || !socketRef.current) return;
        
        if (socketRef.current.connected) {
          const canvas = canvasRef.current;
          if (canvas && videoRef.current) {
            const ctx = canvas.getContext("2d");
            canvas.width = 640; 
            canvas.height = 360;
            ctx?.drawImage(videoRef.current, 0, 0, 640, 360);
            
            socketRef.current.emit("camera:frame", { 
              data: canvas.toDataURL("image/jpeg", 0.6) 
            });
          }
        }
        // Loop de 30 FPS mais robusto
        setTimeout(() => {
          if (activeRef.current) requestAnimationFrame(sendFrame);
        }, 33);
      };
      
      socketRef.current.on("connect", sendFrame);
    } catch (err) {
      alert("Erro na câmera: " + err);
    }
  };

  const stop = () => {
    activeRef.current = false;
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
        {streaming ? "PARAR TRANSMISSÃO" : "TRANSMITIR EM HD"}
      </Button>
    </div>
  );
}
