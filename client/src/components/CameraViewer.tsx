import { Card } from "../components/ui/card";

export default function CameraViewer() {
  return (
    <Card className="w-full bg-background border-border/50 overflow-hidden">
      <div className="relative w-full aspect-video bg-muted flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-muted-foreground text-sm">
            <p className="font-semibold">Câmera ao vivo desativada</p>
            <p className="text-xs mt-1">Esta funcionalidade requer um servidor de back-end</p>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">STATUS</span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <p className="text-xs uppercase font-bold text-red-500">Desconectado</p>
          </span>
        </div>
      </div>
    </Card>
  );
}
