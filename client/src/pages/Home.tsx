import HeroSection from "@/components/HeroSection";
import ARExplainedSection from "@/components/ARExplainedSection";

export default function Home() {
  const handleExplore = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-background pt-16">
      <HeroSection onExplore={handleExplore} />
      <ARExplainedSection />
    </div>
  );
}

