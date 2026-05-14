import { Card } from "@/components/ui/card";
import { Compass, Zap, Radio, Camera } from "lucide-react";

export default function SensorsSection() {
  const sensors = [
    {
      icon: Compass,
      title: "Giroscópio",
      description: "Mede a velocidade angular de rotação nos eixos X, Y e Z",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Zap,
      title: "Acelerômetro",
      description: "Detecta aceleração linear em três dimensões",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Radio,
      title: "Magnetômetro",
      description: "Mede o campo magnético para orientação (bússola)",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Camera,
      title: "Câmera",
      description: "Captura imagens para rastreamento visual e reconhecimento",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <section className="w-full py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Como o Celular <span className="text-primary">Entende o Movimento</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sensores internos trabalham juntos para rastrear posição e orientação em tempo real
          </p>
        </div>

        {/* Grid de sensores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {sensors.map((sensor, index) => {
            const Icon = sensor.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group overflow-hidden"
              >
                <div className={`mb-4 inline-flex p-3 bg-gradient-to-br ${sensor.color} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{sensor.title}</h3>
                <p className="text-sm text-muted-foreground">{sensor.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Visualização 3D */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Eixos de Movimento 3D</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-foreground"><strong>Eixo X:</strong> Movimento horizontal (esquerda-direita)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-foreground"><strong>Eixo Y:</strong> Movimento vertical (cima-baixo)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-foreground"><strong>Eixo Z:</strong> Profundidade (frente-trás)</span>
                </li>
              </ul>
            </div>
            <div className="bg-background rounded-lg p-8 flex items-center justify-center min-h-64">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663139149735/7aawHANkmKJCoetVjQXHah/sensors-3d-visualization-WgYDASkcfk6BknyS29P24x.webp"
                alt="Visualizacao 3D de sensores"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Fluxo de dados */}
        <div className="bg-card rounded-2xl p-8 border border-border/50">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Fluxo de Dados em Tempo Real</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 text-center">
              <div className="bg-primary/10 rounded-lg p-4 mb-2">
                <p className="text-sm font-semibold text-primary">Sensores</p>
              </div>
              <p className="text-xs text-muted-foreground">Giroscópio, Acelerômetro, Câmera</p>
            </div>
            <div className="hidden md:block text-primary">→</div>
            <div className="flex-1 text-center">
              <div className="bg-secondary/10 rounded-lg p-4 mb-2">
                <p className="text-sm font-semibold text-secondary">Processamento</p>
              </div>
              <p className="text-xs text-muted-foreground">Fusão de dados, Cálculos</p>
            </div>
            <div className="hidden md:block text-primary">→</div>
            <div className="flex-1 text-center">
              <div className="bg-accent/10 rounded-lg p-4 mb-2">
                <p className="text-sm font-semibold text-accent">Renderização</p>
              </div>
              <p className="text-xs text-muted-foreground">Objetos 3D na tela</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
