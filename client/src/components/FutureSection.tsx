import { Card } from "@/components/ui/card";
import { GraduationCap, Stethoscope, Gamepad2, Wrench, MapPin, Accessibility } from "lucide-react";

export default function FutureSection() {
  const impacts = [
    {
      icon: GraduationCap,
      title: "Educação",
      description: "Experiências imersivas que transformam como aprendemos ciência, história e matemática",
      color: "from-amber-500 to-orange-600",
      glow: "group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:border-amber-500/50",
    },
    {
      icon: Stethoscope,
      title: "Medicina",
      description: "Cirurgias mais precisas com visualização em tempo real de estruturas internas",
      color: "from-cyan-500 to-blue-600",
      glow: "group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:border-cyan-500/50",
    },
    {
      icon: Gamepad2,
      title: "Jogos",
      description: "Mundos virtuais que se misturam com a realidade para entretenimento imersivo",
      color: "from-orange-500 to-red-600",
      glow: "group-hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] group-hover:border-orange-500/50",
    },
    {
      icon: Wrench,
      title: "Engenharia",
      description: "Visualização e simulação de projetos complexos antes da construção",
      color: "from-purple-500 to-indigo-600",
      glow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:border-purple-500/50",
    },
    {
      icon: MapPin,
      title: "Navegação",
      description: "Direções e informações contextuais sobrepostas ao mundo real",
      color: "from-teal-500 to-emerald-600",
      glow: "group-hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] group-hover:border-teal-500/50",
    },
    {
      icon: Accessibility,
      title: "Acessibilidade",
      description: "Ferramentas que ampliam capacidades e facilitam a vida de pessoas com deficiências",
      color: "from-pink-500 to-rose-600",
      glow: "group-hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] group-hover:border-pink-500/50",
    },
  ];

  return (
    <section className="w-full py-20 bg-slate-950 text-slate-50 overflow-hidden relative">
      {/* Detalhe de fundo simulando a luz central da imagem */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Impacto e <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Futuro</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Como a Realidade Aumentada está transformando diversos campos e criando novas possibilidades através de um ecossistema conectado.
          </p>
        </div>

        {/* Grid de impactos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <Card
                key={index}
                className={`p-8 bg-slate-900/50 border-slate-800 hover:bg-slate-900 transition-all group overflow-hidden relative ${impact.glow}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${impact.color} opacity-0 group-hover:opacity-[0.02] transition-opacity`} />
                <div className="relative z-10">
                  <div className={`mb-4 inline-flex p-3 bg-gradient-to-br ${impact.color} rounded-lg text-white group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">{impact.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{impact.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Imagem do futuro */}
        <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl p-4 md:p-8 border border-slate-800/80 mb-16 backdrop-blur-sm max-w-5xl mx-auto">
          <img
            src="image/impact.png" 
            alt="Infográfico do Ecossistema Conectado da Realidade Aumentada"
            className="w-full h-auto rounded-lg shadow-2xl border border-slate-800"
          />
        </div>

        {/* Mensagem inspiradora */}
        <div className="bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-cyan-950/40 rounded-2xl p-8 md:p-12 border border-slate-800 text-center max-w-3xl mx-auto backdrop-blur-sm">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
            O Futuro é <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Aumentado</span>
          </h3>
          <p className="text-base md:text-lg text-slate-400 mb-6 leading-relaxed">
            A Realidade Aumentada não é apenas uma tecnologia do amanhã — é uma ferramenta que reconecta nosso presente. Unindo IA, IoT, 5G e dados em nuvem, criamos pontes inteligentes entre o físico e o digital.
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-4" />
          <p className="text-sm md:text-base font-semibold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent tracking-wide uppercase">
            A matemática invisível dá vida à realidade aumentada.
          </p>
        </div>
      </div>
    </section>
  );
}
