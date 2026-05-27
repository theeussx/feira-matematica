import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Video, VideoOff } from "lucide-react";

export default function CameraTransmitter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);
  const socketRef = useRef<any>(null);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    if (videoRef.current) videoRef.current.srcObject = stream;
    socketRef.current = io(window.location.origin);
    setStreaming(true);
    
    const send = () => {
      if (!streaming || !canvasRef.current || !videoRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      ctx?.drawImage(videoRef.current, 0, 0);
      socketRef.current.emit("camera:frame", { data: canvasRef.current.toDataURL("image/jpeg", 0.5) });
      setTimeout(send, 100); // 10 FPS para economizar banda
    };
    send();
  };

  return (
    <div className="p-4 space-y-4">
      <video ref={videoRef} autoPlay playsInline muted className="w-full rounded-lg bg-black" />
      <canvas ref={canvasRef} className="hidden" />
      <Button onClick={start} className="w-full" variant={streaming ? "destructive" : "default"}>
        {streaming ? <VideoOff className="mr-2" /> : <Video className="mr-2" />}
        {streaming ? "Parar Transmissão" : "Iniciar Transmissão"}
      </Button>
    </div>
  );
}
