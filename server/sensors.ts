import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { sensorData } from "../drizzle/shema";

const SensorDataSchema = z.object({
  accelerationX: z.number().min(-50).max(50),
  accelerationY: z.number().min(-50).max(50),
  accelerationZ: z.number().min(-50).max(50),
  rotationX: z.number().min(-360).max(360),
  rotationY: z.number().min(-360).max(360),
  rotationZ: z.number().min(-360).max(360),
  deviceId: z.string().min(1).max(128),
});

export const sensorsRouter = router({
  recordData: publicProcedure
    .input(SensorDataSchema)
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(sensorData).values({
        accelerationX: input.accelerationX.toString(),
        accelerationY: input.accelerationY.toString(),
        accelerationZ: input.accelerationZ.toString(),
        rotationX: input.rotationX.toString(),
        rotationY: input.rotationY.toString(),
        rotationZ: input.rotationZ.toString(),
        deviceId: input.deviceId,
        isConnected: 1,
      });

      return { success: true, timestamp: new Date().toISOString() };
    }),

  getLatest: publicProcedure
    .input(z.object({ deviceId: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const rows: any[] = await db.select().from(sensorData).limit(100);
      if (rows.length === 0) return null;

      function escapeRegex(s: string) {
        return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }

      // order rows by createdAt desc (do it in JS to avoid DB-specific API)
      rows.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      let data = null as any;
      if (input.deviceId.includes("*")) {
        const pattern = new RegExp("^" + input.deviceId.split("*").map(escapeRegex).join(".*") + "$", "i");
        data = rows.find((r: any) => pattern.test(r.deviceId));
      } else {
        data = rows.find((r: any) => r.deviceId === input.deviceId);
      }

      // fallback to latest overall
      if (!data) data = rows[0];
      return {
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
      };
    }),
});