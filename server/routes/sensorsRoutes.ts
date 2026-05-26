import express, { Request, Response } from "express";
import { z } from "zod";
import { getDb } from "../db";
import { getIo, setLatestSensorState } from "../socket";
import { sensorData } from "../../drizzle/shema";

const router = express.Router();

const SensorDataSchema = z.object({
  accelerationX: z.number(),
  accelerationY: z.number(),
  accelerationZ: z.number(),
  rotationX: z.number(),
  rotationY: z.number(),
  rotationZ: z.number(),
  deviceId: z.string().min(1).max(128),
});

router.post(
  "/record",
  express.json(),
  async (req: Request, res: Response) => {
    try {
      const parsed = SensorDataSchema.parse(req.body);
      const updatePayload = {
        ...parsed,
        timestamp: new Date().toISOString(),
      };

      // 1. Emitir para o Socket IMEDIATAMENTE (Prioridade Máxima)
      try {
        const io = getIo();
        setLatestSensorState(updatePayload);
        io.emit("sensors:update", updatePayload);
      } catch (e) {
        // ignore se socket não estiver pronto
      }

      // 2. Responder ao App IMEDIATAMENTE (Libera o celular para o próximo envio)
      res.json({ success: true });

      // 3. Gravar no Banco em SEGUNDO PLANO (Não bloqueia a resposta)
      // Não usamos 'await' aqui propositalmente para não atrasar o fluxo
      getDb().then(async (db) => {
        if (db) {
          await db.insert(sensorData).values({
            accelerationX: parsed.accelerationX.toString(),
            accelerationY: parsed.accelerationY.toString(),
            accelerationZ: parsed.accelerationZ.toString(),
            rotationX: parsed.rotationX.toString(),
            rotationY: parsed.rotationY.toString(),
            rotationZ: parsed.rotationZ.toString(),
            deviceId: parsed.deviceId,
            isConnected: 1,
          });
        }
      }).catch(err => {
        console.warn("DB background insert failed:", err?.message);
      });

    } catch (e: any) {
      return res.status(400).json({ error: e?.message ?? String(e) });
    }
  }
);

router.get("/latest", async (req: Request, res: Response) => {
  const deviceId = String(req.query.deviceId || "");
  const db = await getDb();
  if (!db) return res.status(500).json(null);

  const rows: any[] = await db.select().from(sensorData).limit(200);
  if (rows.length === 0) return res.status(200).json(null);

  rows.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  function escapeRegex(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  let data: any = null;
  if (deviceId.includes("*")) {
    const pattern = new RegExp("^" + deviceId.split("*").map(escapeRegex).join(".*") + "$", "i");
    data = rows.find((r: any) => pattern.test(r.deviceId));
  } else if (deviceId) {
    data = rows.find((r: any) => r.deviceId === deviceId);
  }

  if (!data) data = rows[0];

  return res.json({
    id: data.id,
    accelerationX: parseFloat(data.accelerationX as any),
    accelerationY: parseFloat(data.accelerationY as any),
    accelerationZ: parseFloat(data.accelerationZ as any),
    rotationX: parseFloat(data.rotationX as any),
    rotationY: parseFloat(data.rotationY as any),
    rotationZ: parseFloat(data.rotationZ as any),
    deviceId: data.deviceId,
    isConnected: data.isConnected === 1,
    createdAt: data.createdAt,
  });
});

export default router;
