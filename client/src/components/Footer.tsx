import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Sobre */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Sobre o Projeto</h3>
            <p className="text-sm text-muted-foreground">
              Uma Feira de Matemática que explora como a Realidade Aumentada usa matemática e sensores para entender o mundo.
            </p>
          </div>

          {/* Seções */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Seções</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">O que é AR</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Sensores</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Matemática</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Demonstração</a></li>
            </ul>
          </div>

          {/* Tecnologias */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Tecnologias</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>React 19</li>
              <li>TypeScript</li>
              <li>Tailwind CSS 4</li>
              <li>Realidade Aumentada</li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Feito por Mateus com</span>
            <Heart className="w-4 h-4 text-accent fill-accent" />
            <span>para a Feira de Matemática 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
