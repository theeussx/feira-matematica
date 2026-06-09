import { Card } from "../components/ui/card";

export default function CameraViewer() {
  return (
    <div className="w-full min-h-screen bg-background pt-20 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Visualizador de Câmera</h1>
        
        <Card className="relative w-full aspect-video bg-black overflow-hidden border-2 border-dashed border-border">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white">
            <p className="text-lg font-semibold">Câmera ao vivo desativada</p>
            <p className="text-sm text-gray-400 mt-2">Esta funcionalidade requer um servidor de back-end</p>
          </div>
        </Card>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Informações</h2>
          <p className="text-muted-foreground">
            O visualizador de câmera ao vivo foi desativado para permitir hospedagem estática na Vercel. 
            Para usar esta funcionalidade, você precisará de um servidor de back-end com suporte a WebSocket.
          </p>
        </div>
      </div>
    </div>
  );
}
