import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import S20DemoSection from "@/components/S20DemoSection";
import FutureSection from "@/components/FutureSection";

export default function Demo( ) {
  const [latestData, setLatestData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  // Conexão WebSocket para receber atualizações em tempo real
  useEffect(() => {
    const serverUrl = `${window.location.protocol}//${window.location.hostname}:3000`;
    const socket: Socket = io(serverUrl);

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
      <FutureSection />
    </div>
  );
}