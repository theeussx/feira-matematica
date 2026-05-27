import { Server as IOServer, Socket } from "socket.io";

export function initCamera(io: IOServer) {
  io.on("connection", (socket: Socket) => {
    // Quando o celular envia um frame, o servidor repassa para todos os outros
    socket.on("camera:frame", (frameData: any) => {
      socket.broadcast.emit("camera:frame", frameData);
    });

    socket.on("camera:stop", () => {
      socket.broadcast.emit("camera:stop");
    });
  });
}
