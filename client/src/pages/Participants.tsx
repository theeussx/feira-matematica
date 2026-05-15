import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

export default function Participants() {
  const participants = [
    {
      id: 1,
      name: "Mateus Henrique",
      role: "Desenvolvedor do site",
      image: "/participants/participant-1.jpg",
    },
    {
      id: 2,
      name: "Participante 2",
      role: "Função",
      image: null,
    },
    {
      id: 3,
      name: "Participante 3",
      role: "Função",
      image: null,
    },
    {
      id: 4,
      name: "Participante 4",
      role: "Função",
      image: null,
    },
    {
      id: 5,
      name: "Participante 5",
      role: "Função",
      image: null,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-background pt-20">
      <section className="w-full py-20">
        <div className="container mx-auto px-4">
          {/* Cabeçalho */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nossa <span className="text-primary">Equipe</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça os participantes da Feira de Matemática 2026
            </p>
          </div>

          {/* Grid de participantes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {participants.map((participant) => (
              <Card
                key={participant.id}
                className="p-6 bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group overflow-hidden"
              >
                {/* Espaço para foto */}
                <div className="mb-4 w-full aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border group-hover:border-primary/50 overflow-hidden">
                  {participant.image ? (
                    <img
                      src={participant.image}
                      alt={participant.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <User className="w-12 h-12 text-muted-foreground" />

                      <p className="text-xs text-muted-foreground text-center">
                        Adicionar foto
                      </p>
                    </div>
                  )}
                </div>

                {/* Informações */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {participant.name}
                  </h3>

                  <p className="text-sm text-primary font-semibold">
                    {participant.role}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
