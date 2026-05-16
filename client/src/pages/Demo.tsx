import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import S20DemoSection from "@/components/S20DemoSection";
import FutureSection from "@/components/FutureSection";

export default function Demo( ) {
  const [latestData, setLatestData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Buscar dados a cada 500ms
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await trpc.sensors.getLatest.query({ deviceId: "S20FE-*" });
        if (data) {
          setLatestData(data);
          setIsConnected(true);
        }
      } catch (error) {
        setIsConnected(false);
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-background pt-20">
      <S20DemoSection latestData={latestData} isConnected={isConnected} />
      <FutureSection />
    </div>
  );
}