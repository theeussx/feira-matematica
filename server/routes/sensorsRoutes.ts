import express, { Request, Response } from "express";
import { z } from "zod";
import { getDb } from "../db";
import { sensorData } from "../../drizzle/shema";

const router = express.Router();

const SensorDataSchema = z.object({
  accelerationX: z.number().min(-50).max(50),
  accelerationY: z.number().min(-50).max(50),
  accelerationZ: z.number().min(-50).max(50),
  rotationX: z.number().min(-360).max(360),
  rotationY: z.number().min(-360).max(360),
  rotationZ: z.number().min(-360).max(360),
  deviceId: z.string().min(1).max(128),
});

router.post(
  "/record",
  express.json(),
  async (req: Request, res: Response) => {
    try {
      const parsed = SensorDataSchema.parse(req.body);
      const db = await getDb();
      if (!db) return res.status(500).json({ error: "DB not available" });

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

      return res.json({ success: true, timestamp: new Date().toISOString() });
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
