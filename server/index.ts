import express from "express";
import { createServer } from "http";
import * as path from "path";
import { fileURLToPath } from "url";
import sensorsRouter from "./routes/sensorsRoutes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(express.json());
app.use("/api/sensors", sensorsRouter);

const staticPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

app.use(express.static(staticPath));
app.get("/api/*", (_req, res) => res.status(404).end());
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

export async function startServer() {
  const server = createServer(app);
  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

if (process.env.START_SERVER !== "false") {
  startServer().catch(console.error);
}

export default app;
