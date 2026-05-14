import { Card } from "@/components/ui/card";
import { GraduationCap, Stethoscope, Gamepad2, Wrench, MapPin, Accessibility } from "lucide-react";

export default function FutureSection() {
  const impacts = [
    {
      icon: GraduationCap,
      title: "Educação",
      description: "Experiências imersivas que transformam como aprendemos ciência, história e matemática",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Stethoscope,
      title: "Medicina",
      description: "Cirurgias mais precisas com visualização em tempo real de estruturas internas",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Gamepad2,
      title: "Jogos",
      description: "Mundos virtuais que se misturam com a realidade para entretenimento imersivo",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Wrench,
      title: "Engenharia",
      description: "Visualização e simulação de projetos complexos antes da construção",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: MapPin,
      title: "Navegação",
      description: "Direções e informações contextuais sobrepostas ao mundo real",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Accessibility,
      title: "Acessibilidade",
      description: "Ferramentas que ampliam capacidades e facilitam a vida de pessoas com deficiências",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <section className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Impacto e <span className="text-primary">Futuro</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Como a Realidade Aumentada está transformando diversos campos e criando novas possibilidades
          </p>
        </div>

        {/* Grid de impactos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <Card
                key={index}
                className="p-8 bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${impact.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="relative z-10">
                  <div className={`mb-4 inline-flex p-3 bg-gradient-to-br ${impact.color} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{impact.title}</h3>
                  <p className="text-muted-foreground">{impact.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Imagem do futuro */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50 mb-16">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663139149735/7aawHANkmKJCoetVjQXHah/future-technology-impact-DvdSFsP59JPGCNjGYymuBK.webp"
            alt="Impacto futuro da Realidade Aumentada"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Mensagem inspiradora */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-12 border border-border/50 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            O Futuro é <span className="text-primary">Aumentado</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            A Realidade Aumentada não é apenas uma tecnologia do futuro — é uma ferramenta que está transformando o presente. Combinando matemática, sensores e criatividade, estamos criando formas completamente novas de interagir com o mundo.
          </p>
          <p className="text-lg font-semibold text-foreground">
            A matemática invisível dá vida à realidade aumentada.
          </p>
        </div>
      </div>
    </section>
  );
}
