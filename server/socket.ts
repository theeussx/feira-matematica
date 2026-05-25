import { Server as IOServer } from "socket.io";
import { createServer } from "http";

let io: IOServer | null = null;
let latestSensorState: any = null;

export function initSocket(server: ReturnType<typeof createServer>) {
  io = new IOServer(server, {
    cors: {
      origin: true,
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

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}

export function setLatestSensorState(data: any) {
  latestSensorState = data;
}

export function getIo() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}
