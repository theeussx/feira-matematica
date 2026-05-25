const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json({ limit: "2mb" }));

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

let latestSensorData = null;

app.post("/api/sensors", (req, res) => {
  const data = req.body;

  if (!data || !data.device) {
    return res.status(400).json({
      ok: false,
      error: "Dados inválidos"
    });
  }

  latestSensorData = {
    ...data,
    receivedAt: Date.now()
  };

  io.emit("sensor:update", latestSensorData);

  return res.json({
    ok: true,
    message: "Dados recebidos",
    receivedAt: latestSensorData.receivedAt
  });
});

app.get("/api/sensors/latest", (req, res) => {
  if (!latestSensorData) {
    return res.status(404).json({
      ok: false,
      error: "Nenhum dado recebido ainda"
    });
  }

  return res.json({
    ok: true,
    data: latestSensorData
  });
});

io.on("connection", (socket) => {
  console.log("Site conectado:", socket.id);

  if (latestSensorData) {
    socket.emit("sensor:update", latestSensorData);
  }

  socket.on("disconnect", () => {
    console.log("Site desconectado:", socket.id);
  });
});

const PORT = 4000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});