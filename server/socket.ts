import { Server as IOServer } from "socket.io";
import { createServer } from "http";
import { initCamera } from "./camera.js"; // Importação da câmera

let io: IOServer | null = null;
let latestSensorState: any = null;

export function initSocket(server: ReturnType<typeof createServer> ) {
  const socketOrigin = process.env.SOCKET_ORIGIN ? process.env.SOCKET_ORIGIN.split(",") : true;

  io = new IOServer(server, {
    cors: {
      origin: socketOrigin,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("sensors:subscribe", ({ deviceId }: { deviceId?: string }) => {
      if (latestSensorState) {
        socket.emit("sensors:update", latestSensorState);
      }
    });

    // permitir que clientes (ex.: app Android em dev) publiquem dados via socket
    socket.on("sensors:publish", (data: any) => {
      try {
        // atualizar último estado e retransmitir para todos os clientes
        latestSensorState = data;
        if (io) io.emit("sensors:update", data);
      } catch (e) {
        console.warn("Erro ao processar sensors:publish", e);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  // INICIALIZA A CÂMERA AQUI
  initCamera(io);

  return io;
}

export function setLatestSensorState(data: any) {
  latestSensorState = data;
}

export function getIo() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}
