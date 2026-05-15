import HeroSection from "@/components/HeroSection";
import ARExplainedSection from "@/components/ARExplainedSection";

interface HomeProps {
  logoSrc: string | null;
}

export default function Home({ logoSrc }: HomeProps) {
  const handleExplore = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-background pt-16">
      <HeroSection onExplore={handleExplore} logoSrc={logoSrc} />
      <ARExplainedSection />
    </div>
  );
}

