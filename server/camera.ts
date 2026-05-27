import { Server as IOServer, Socket } from "socket.io";

interface CameraState {
  transmitterId: string | null;
  viewers: Set<string>;
}

let cameraState: CameraState = {
  transmitterId: null,
  viewers: new Set(),
};

export function initCamera(io: IOServer) {
  io.on("connection", (socket: Socket) => {
    socket.on("camera:subscribe", () => {
      cameraState.viewers.add(socket.id);
      if (cameraState.transmitterId) {
        io.to(cameraState.transmitterId).emit("camera:viewer-count", cameraState.viewers.size - 1);
      }
    });

    socket.on("camera:frame", (frameData: { data: string; timestamp: number }) => {
      cameraState.transmitterId = socket.id;
      cameraState.viewers.forEach((viewerId) => {
        if (viewerId !== socket.id) {
          io.to(viewerId).emit("camera:frame", frameData);
        }
      });
    });

    socket.on("camera:stop", () => {
      if (cameraState.transmitterId === socket.id) cameraState.transmitterId = null;
      cameraState.viewers.forEach((viewerId) => io.to(viewerId).emit("camera:stop"));
    });

    socket.on("disconnect", () => {
      if (cameraState.transmitterId === socket.id) {
        cameraState.transmitterId = null;
        cameraState.viewers.forEach((viewerId) => io.to(viewerId).emit("camera:stop"));
      }
      cameraState.viewers.delete(socket.id);
    });
  });
}
