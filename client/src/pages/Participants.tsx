import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

export default function Participants() {
  const participants = [
    {
      id: 1,
      name: "Mateus Henrique",
      role: "Desenvolvedor full stack",
      image: "/image/participants/mateus.png",
    },
    {
      id: 2,
      name: "Arthur Felipe",
      role: "Desenvolvedor do aplicativo",
      image: "/image/participants/arthur.png",
    },
    {
      id: 3,
      name: "Alisson Felipe",
      role: "Participante",
      image: "/image/participants/alisson.png",
    },
    {
      id: 4,
      name: "Matheus Gabriel",
      role: "Participante",
      image: "/image/participants/matheus.png",
    },
    {
      id: 5,
      name: "Luiz Henrique",
      role: "Participante",
      image: "/image/participants/luiz.png",
    },
    {
      id: 6,
      name: "Rivaldo Lopes",
      role: "Professor orientador",
      image: "/image/participants/rivaldo.png",
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
              Conheça os participantes da Feira de Matemática 2026.
              abaixo esta as fotos dos participantes de forma fictícia. elas representa como cada um se imagina fazendo parte do trabalho.
            </p>
          </div>

          {/* Grid de participantes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {participants.map((participant) => (
              <Card
                key={participant.id}
                className={`p-6 bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group overflow-hidden ${participant.id === 6 ? "lg:col-start-3 lg:row-start-2" : ""}`}
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

                  {participant.id === 1 ? (
                    <a
                      href="https://theeussx.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
                    >
                      Ver portfólio
                    </a>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
