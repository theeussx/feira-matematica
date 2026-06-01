import { Card } from "../components/ui/card";
import { Activity, Radio, Zap } from "lucide-react";
import CameraViewer from "./CameraViewer"; // 1. ADICIONE ESTE IMPORT

export default function S20DemoSection({ latestData, isConnected }: { latestData?: any; isConnected?: boolean }) {
  return (
    <section className="w-full py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Parte Prática: O <span className="text-primary">Samsung S20FE 5g</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um smartphone sem tela e ainda consegue entender movimento e espaço usando sensores internos.
          </p>
        </div>

        {/* Narrativa */}
        <div className="bg-card rounded-2xl p-8 border border-border/50 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-lg p-6 mb-4 inline-block">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Reutilização Tecnológica</h3>
              <p className="text-muted-foreground text-sm">Um dispositivo "descartado" ganha nova vida como ferramenta educativa.</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary/10 rounded-lg p-6 mb-4 inline-block">
                <Radio className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Sensores Ativos</h3>
              <p className="text-muted-foreground text-sm">Mesmo sem tela, os sensores continuam funcionando e enviando dados.</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 rounded-lg p-6 mb-4 inline-block">
                <Activity className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Tempo Real</h3>
              <p className="text-muted-foreground text-sm">Movimentos são detectados e processados instantaneamente.</p>
            </div>
          </div>
        </div>

        {/* Demonstração ao vivo */}
        <div className="bg-card rounded-2xl p-8 border border-border/50">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Demonstração ao Vivo</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 2. AQUI ESTÁ A MUDANÇA: TROCAMOS O DIV VAZIO PELO COMPONENTE DE CÂMERA */}
            <CameraViewer />

            {/* Painel de indicadores */}
            <div className="space-y-4">
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">Acelerômetro - Eixo X</p>
                  <p className="text-primary font-mono">{latestData?.accelerationX?.toFixed?.(2) ?? "0.00"} m/s²</p>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">Acelerômetro - Eixo Y</p>
                  <p className="text-secondary font-mono">{latestData?.accelerationY?.toFixed?.(2) ?? "0.00"} m/s²</p>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: "32%" }} />
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">Acelerômetro - Eixo Z</p>
                  <p className="text-accent font-mono">{latestData?.accelerationZ?.toFixed?.(2) ?? "9.81"} m/s²</p>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "18%" }} />
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Status do S20FE (Sensores)</p>
                  <span className="inline-flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <p className="text-xs uppercase font-bold" style={{ color: isConnected ? '#10b981' : '#ef4444' }}>
                      {isConnected ? 'Conectado' : 'Desconectado'}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
