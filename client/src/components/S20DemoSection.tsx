import { useEffect, useRef } from "react";
import { Activity, Radio, Zap, Video } from "lucide-react";

interface S20DemoSectionProps {
  latestData?: {
    accelerationX?: number;
    accelerationY?: number;
    accelerationZ?: number;
  };
  isConnected?: boolean;
  stream?: MediaStream | null;
}

export default function S20DemoSection({ latestData, isConnected, stream }: S20DemoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const getPercentage = (value?: number) => {
    if (!value) return "0%";
    const absValue = Math.abs(value);
    const percentage = Math.min((absValue / 15) * 100, 100); // Mapeia dinamicamente até 15 m/s²
    return `${percentage}%`;
  };

  return (
    <section className="w-full py-12 bg-slate-950 text-slate-50">
      <div className="container mx-auto px-4">
        
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Parte Prática: O <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Samsung S20FE 5g</span>
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            Um smartphone sem tela que ainda consegue entender movimento e espaço usando sensores internos.
          </p>
        </div>

        {/* Blocos de Narrativa */}
        <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-900 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center group p-4 rounded-xl hover:bg-slate-900/50 transition-colors">
              <div className="bg-blue-500/10 rounded-lg p-4 mb-3 inline-block text-blue-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-1">Reutilização</h3>
              <p className="text-slate-400 text-xs">Um dispositivo descartado ganha nova vida como ferramenta educativa.</p>
            </div>
            <div className="text-center group p-4 rounded-xl hover:bg-slate-900/50 transition-colors">
              <div className="bg-cyan-500/10 rounded-lg p-4 mb-3 inline-block text-cyan-400">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-1">Sensores Ativos</h3>
              <p className="text-slate-400 text-xs">Mesmo sem tela, giroscópio e acelerômetro funcionam em segundo plano.</p>
            </div>
            <div className="text-center group p-4 rounded-xl hover:bg-slate-900/50 transition-colors">
              <div className="bg-purple-500/10 rounded-lg p-4 mb-3 inline-block text-purple-400">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-1">Tempo Real</h3>
              <p className="text-slate-400 text-xs">Movimentos e rotações calculados instantaneamente sem atraso.</p>
            </div>
          </div>
        </div>

        {/* Painel da Demonstração Ao Vivo */}
        <div className="bg-slate-900/20 rounded-2xl p-6 border border-slate-900 max-w-5xl mx-auto">
          <h3 className="text-xl font-bold text-slate-200 mb-6 text-center">Demonstração Integrada</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Player de Vídeo do Celular */}
            <div className="bg-slate-950 rounded-xl border border-slate-900 overflow-hidden min-h-[320px] relative flex flex-col items-center justify-center shadow-2xl">
              {stream ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover absolute inset-0"
                />
              ) : (
                <div className="text-center p-6 relative z-10">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <Video className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-slate-200 font-semibold text-sm mb-1">Aguardando Feed de Vídeo</p>
                  <p className="text-xs text-slate-500 max-w-xs">Abra o painel no celular auxiliar para ativar a transmissão de apoio.</p>
                </div>
              )}
              {/* Detalhes HUD de Câmera */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-blue-500/40 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-blue-500/40 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-blue-500/40 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-blue-500/40 pointer-events-none" />
            </div>

            {/* Gráficos e Sensores em Tempo Real */}
            <div className="flex flex-col justify-between space-y-4">
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-900">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Acelerômetro - Eixo X</p>
                  <p className="text-blue-400 font-mono font-bold text-sm">{latestData?.accelerationX?.toFixed(2) ?? "0.00"} m/s²</p>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full transition-all duration-100" style={{ width: getPercentage(latestData?.accelerationX) }} />
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-900">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Acelerômetro - Eixo Y</p>
                  <p className="text-cyan-400 font-mono font-bold text-sm">{latestData?.accelerationY?.toFixed(2) ?? "0.00"} m/s²</p>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full transition-all duration-100" style={{ width: getPercentage(latestData?.accelerationY) }} />
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-900">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Acelerômetro - Eixo Z</p>
                  <p className="text-purple-400 font-mono font-bold text-sm">{latestData?.accelerationZ?.toFixed(2) ?? "9.81"} m/s²</p>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full transition-all duration-100" style={{ width: getPercentage(latestData?.accelerationZ) }} />
                </div>
              </div>

              {/* Status do S20FE WebSocket */}
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-900 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status do S20FE (Sensores)</p>
                <span className="inline-flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                  <p className={`text-[10px] font-bold tracking-widest ${isConnected ? "text-emerald-400" : "text-rose-400"}`}>
                    {isConnected ? "ONLINE" : "DESCONECTADO"}
                  </p>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
