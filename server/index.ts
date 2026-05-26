import express, { Request, Response } from "express";
import { createServer } from "http";
import { initSocket } from "./socket";
import * as path from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";
import sensorsRouter from "./routes/sensorsRoutes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(express.json());
app.use(
  "/api/sensors",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  },
  sensorsRouter
);

const staticPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

const mobileSensorsPath = path.resolve(__dirname, "..", "sensorsS20");

if (fs.existsSync(mobileSensorsPath)) {
  app.use("/sensorsS20", express.static(mobileSensorsPath));
}

if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
  app.get("/api/*", (_req: Request, res: Response) => res.status(404).end());
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
} else {
  app.get("/api/*", (_req: Request, res: Response) => res.status(404).end());
}

export async function startServer() {
  const server = createServer(app);
  // inicializar socket.io
  try {
    initSocket(server);
  } catch (e) {
    console.warn("Falha ao inicializar socket.io", e);
  }
  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

if (process.env.START_SERVER !== "false") {
  startServer().catch(console.error);
}

export default app;
