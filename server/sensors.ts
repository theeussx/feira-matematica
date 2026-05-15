import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { sensorData } from "../drizzle/schema";

/**
 * Sensor data validation schema
 * Matches the data structure sent from the S20FE device
 */
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
  /**
   * Public endpoint to receive sensor data from S20FE device
   * The device sends data via HTTP POST with JSON body
   */
  recordData: publicProcedure
    .input(SensorDataSchema)
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      try {
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

        return {
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error("Failed to record sensor data:", error);
        throw new Error("Failed to record sensor data");
      }
    }),

  /**
   * Get the latest sensor reading
   * Used by the frontend to display real-time data
   */
  getLatest: publicProcedure
    .input(z.object({ deviceId: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        return null;
      }

      try {
        const result = await db
          .select()
          .from(sensorData)
          .where((table) => {
            // Note: This is a simplified query. In production, use proper WHERE clause
            return undefined;
          })
          .orderBy((table) => table.createdAt)
          .limit(1);

        if (result.length === 0) {
          return null;
        }

        const data = result[0];
        return {
          id: data.id,
          accelerationX: parseFloat(data.accelerationX),
          accelerationY: parseFloat(data.accelerationY),
          accelerationZ: parseFloat(data.accelerationZ),
          rotationX: parseFloat(data.rotationX),
          rotationY: parseFloat(data.rotationY),
          rotationZ: parseFloat(data.rotationZ),
          deviceId: data.deviceId,
          isConnected: data.isConnected === 1,
          createdAt: data.createdAt,
        };
      } catch (error) {
        console.error("Failed to get latest sensor data:", error);
        return null;
      }
    }),

  /**
   * Get sensor data history for analytics
   */
  getHistory: publicProcedure
    .input(
      z.object({
        deviceId: z.string(),
        limit: z.number().min(1).max(100).default(50),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        return [];
      }

      try {
        const result = await db
          .select()
          .from(sensorData)
          .limit(input.limit);

        return result.map((data) => ({
          id: data.id,
          accelerationX: parseFloat(data.accelerationX),
          accelerationY: parseFloat(data.accelerationY),
          accelerationZ: parseFloat(data.accelerationZ),
          rotationX: parseFloat(data.rotationX),
          rotationY: parseFloat(data.rotationY),
          rotationZ: parseFloat(data.rotationZ),
          deviceId: data.deviceId,
          isConnected: data.isConnected === 1,
          createdAt: data.createdAt,
        }));
      } catch (error) {
        console.error("Failed to get sensor history:", error);
        return [];
      }
    }),

  /**
   * Update device connection status
   */
  updateConnectionStatus: publicProcedure
    .input(
      z.object({
        deviceId: z.string(),
        isConnected: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      try {
        // In production, use proper UPDATE query
        // For now, we just record the status change
        await db.insert(sensorData).values({
          accelerationX: "0",
          accelerationY: "0",
          accelerationZ: "0",
          rotationX: "0",
          rotationY: "0",
          rotationZ: "0",
          deviceId: input.deviceId,
          isConnected: input.isConnected ? 1 : 0,
        });

        return { success: true };
      } catch (error) {
        console.error("Failed to update connection status:", error);
        throw new Error("Failed to update connection status");
      }
    }),
});
