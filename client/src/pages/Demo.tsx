import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import S20DemoSection from "@/components/S20DemoSection";

export default function Demo( ) {
  const [latestData, setLatestData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Conexão WebSocket para receber atualizações em tempo real
  useEffect(() => {
    // Em produção no Render, o socket deve usar a mesma URL do site (sem porta 3000)
    // Em desenvolvimento local, o Vite costuma rodar na 5173 e o server na 3000
    const isProd = import.meta.env.PROD;
    const defaultUrl = isProd 
      ? `${window.location.protocol}//${window.location.host}`
      : `${window.location.protocol}//${window.location.hostname}:3000`;

    const serverUrl = (import.meta.env as any).VITE_SOCKET_URL || defaultUrl;
    
    console.log("Connecting to socket at:", serverUrl);
    
    const socket: Socket = io(serverUrl, { 
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5
    });

    socket.on("connect", () => {
      console.log("socket connected", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", (reason) => {
      console.log("socket disconnected", reason);
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("socket connect_error", err);
      setIsConnected(false);
    });

    socket.on("sensors:update", (data: any) => {
      console.log("sensors:update", data);
      setLatestData(data);
      setIsConnected(true);
    });

    // opcional: pedir último estado ao conectar
    socket.emit("sensors:subscribe", { deviceId: "S20FE-*" });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-background pt-20">
      <S20DemoSection latestData={latestData} isConnected={isConnected} />
    </div>
  );
}
