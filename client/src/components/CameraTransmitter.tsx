import { Button } from "../components/ui/button";
import { Video } from "lucide-react";

export default function CameraTransmitter() {
  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <div className="w-full rounded-lg bg-black border shadow-xl aspect-video flex items-center justify-center">
        <div className="text-center text-white space-y-2">
          <p className="text-sm font-semibold">Transmissor desativado</p>
          <p className="text-xs text-gray-400">Requer servidor de back-end</p>
        </div>
      </div>
      <Button disabled className="w-full py-8 text-xl font-bold shadow-lg">
        <Video className="mr-2" />
        TRANSMITIR EM HD
      </Button>
    </div>
  );
}
