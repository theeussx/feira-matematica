import { Card } from "@/components/ui/card";

export default function MathSection() {
  const concepts = [
    {
      title: "Coordenadas 3D",
      formula: "(x, y, z)",
      description: "Cada ponto no espaço é representado por três valores que indicam sua posição nos eixos X, Y e Z.",
    },
    {
      title: "Distância Euclidiana",
      formula: "d = sqrt((x2-x1)² + (y2-y1)² + (z2-z1)²)",
      description: "Calcula a distância entre dois pontos no espaço 3D usando o teorema de Pitágoras.",
    },
    {
      title: "Ângulos e Rotação",
      formula: "θ = arctan(y/x)",
      description: "Ângulos determinam a orientação dos objetos em relação aos eixos de coordenadas.",
    },
    {
      title: "Vetores",
      formula: "v = (vx, vy, vz)",
      description: "Representam direção e magnitude do movimento em três dimensões.",
    },
  ];

  return (
    <section className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            A <span className="text-primary">Matemática</span> da Realidade Aumentada
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conceitos matemáticos fundamentais que permitem a AR funcionar
          </p>
        </div>

        {/* Grid de conceitos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {concepts.map((concept, index) => (
            <Card
              key={index}
              className="p-8 bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group"
            >
              <h3 className="text-xl font-bold text-foreground mb-3">{concept.title}</h3>
              <div className="bg-primary/10 rounded-lg p-4 mb-4 font-mono text-lg text-primary text-center">
                {concept.formula}
              </div>
              <p className="text-muted-foreground">{concept.description}</p>
            </Card>
          ))}
        </div>

        {/* Visualização matemática */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663139149735/7aawHANkmKJCoetVjQXHah/math-coordinates-visual-7DFR52dK2y57XZrdeNcixa.webp"
            alt="Visualizacao matematica de coordenadas e espacos"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
