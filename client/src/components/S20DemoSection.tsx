import { Card } from "@/components/ui/card";
import { Activity, Radio, Zap } from "lucide-react";

export default function S20DemoSection() {
  return (
    <section className="w-full py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Parte Prática: O <span className="text-primary">Samsung S20</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um smartphone antigo sem tela ainda consegue entender movimento e espaço usando sensores internos
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
              <p className="text-muted-foreground text-sm">Um dispositivo descartado ganha nova vida como ferramenta educativa</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary/10 rounded-lg p-6 mb-4 inline-block">
                <Radio className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Sensores Ativos</h3>
              <p className="text-muted-foreground text-sm">Mesmo sem tela, os sensores continuam funcionando e enviando dados</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 rounded-lg p-6 mb-4 inline-block">
                <Activity className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Tempo Real</h3>
              <p className="text-muted-foreground text-sm">Movimento detectado e processado instantaneamente</p>
            </div>
          </div>
        </div>

        {/* Fluxo de dados */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50 mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Fluxo de Dados do S20</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Sensores Capturam Dados</p>
                <p className="text-sm text-muted-foreground">Giroscópio, acelerômetro e magnetômetro coletam informações de movimento</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                <span className="text-secondary font-bold">2</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Processamento Local</p>
                <p className="text-sm text-muted-foreground">Algoritmos calculam posição, orientação e velocidade em tempo real</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-accent font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Transmissão de Dados</p>
                <p className="text-sm text-muted-foreground">Informações são enviadas via Bluetooth ou WiFi para outro dispositivo</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">4</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Visualização</p>
                <p className="text-sm text-muted-foreground">Dados são exibidos em tempo real em um monitor ou projetor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demonstração ao vivo */}
        <div className="bg-card rounded-2xl p-8 border border-border/50">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Demonstração ao Vivo</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Área de câmera */}
            <div className="bg-background rounded-lg border-2 border-dashed border-border p-8 flex flex-col items-center justify-center min-h-80">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Radio className="w-8 h-8 text-primary" />
                </div>
                <p className="text-foreground font-semibold mb-2">Câmera ao Vivo</p>
                <p className="text-sm text-muted-foreground">Espaço preparado para projeção em parede</p>
              </div>
            </div>

            {/* Painel de indicadores */}
            <div className="space-y-4">
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">Movimento X</p>
                  <p className="text-primary font-mono">+0.45 m/s</p>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">Movimento Y</p>
                  <p className="text-secondary font-mono">-0.32 m/s</p>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: "32%" }} />
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">Movimento Z</p>
                  <p className="text-accent font-mono">+0.18 m/s</p>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "18%" }} />
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Status de Conexão</p>
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-xs text-green-600">Conectado</p>
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
