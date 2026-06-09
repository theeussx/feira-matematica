import S20DemoSection from "../components/S20DemoSection";

export default function Demo() {
  // Dados estáticos para demonstração
  const demoData = {
    accelerationX: 0.15,
    accelerationY: -0.32,
    accelerationZ: 9.81,
  };

  return (
    <div className="w-full min-h-screen bg-background pt-20">
      <S20DemoSection latestData={demoData} isConnected={false} />
    </div>
  );
}
