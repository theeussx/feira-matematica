import { Button } from "../components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onExplore?: () => void;
  logoSrc?: string | null;
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Fundo animado com gradiente */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center max-w-4xl">
       

        {/* Título principal */}
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Como os celulares conseguem entender o espaço usando {" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            matemática?
          </span>
        </h1>

        {/* Descrição */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Realidade Aumentada mistura o mundo real com objetos digitais usando sensores, cálculos matemáticos e rastreamento espacial. Descubra como a tecnologia entende o espaço ao seu redor.
        </p>

        {/* Botão CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Button
            onClick={onExplore}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-primary/50"
          >
            Explorar Projeto
          </Button>
          
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-primary" />
      </div>
    </section>
  );
}
