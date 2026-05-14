import { Card } from "@/components/ui/card";
import { Zap, Eye, Smartphone, Layers } from "lucide-react";

export default function ARExplainedSection() {
  const features = [
    {
      icon: Eye,
      title: "O que é AR?",
      description: "Realidade Aumentada sobrepõe elementos digitais ao mundo real, permitindo interação em tempo real com objetos virtuais.",
    },
    {
      icon: Layers,
      title: "AR vs VR",
      description: "Enquanto AR adiciona elementos digitais ao mundo real, VR cria um ambiente completamente digital e imersivo.",
    },
    {
      icon: Smartphone,
      title: "Como funciona?",
      description: "Câmeras e sensores do smartphone rastreiam o ambiente, calculam posições e renderizam objetos 3D em tempo real.",
    },
    {
      icon: Zap,
      title: "Aplicações",
      description: "AR é usada em educação, medicina, jogos, navegação, engenharia e muito mais.",
    },
  ];

  return (
    <section className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            O que é <span className="text-primary">Realidade Aumentada?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entenda os conceitos fundamentais que tornam a AR possível
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 bg-card hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/50 group"
              >
                <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Imagem ilustrativa */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663139149735/7aawHANkmKJCoetVjQXHah/ar-vs-vr-illustration-Q6EAt3HbezqT5oB8xJgM4k.webp"
            alt="Comparacao entre Realidade Aumentada e Virtual"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
