import CameraTransmitter from "../components/CameraTransmitter";

export default function CameraTransmit() {
  return (
    <div className="w-full min-h-screen bg-background pt-20 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-foreground">Transmissor de Câmera</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Esta funcionalidade foi desativada para permitir hospedagem estática na Vercel.
        </p>
        <CameraTransmitter />
        
        <div className="mt-12 p-6 bg-muted rounded-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Sobre esta página</h2>
          <p className="text-muted-foreground">
            O transmissor de câmera ao vivo requer um servidor de back-end com suporte a WebSocket para funcionar. 
            Se você deseja usar esta funcionalidade, considere hospedar o servidor em uma plataforma como Render, 
            Railway ou similar que suporte Node.js com WebSocket.
          </p>
        </div>
      </div>
    </div>
  );
}
