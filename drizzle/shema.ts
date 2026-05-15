import { decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Sensor data table for S20FE real-time demonstration
 * Stores movement data (X, Y, Z axes) from the device
 */
export const sensorData = mysqlTable("sensorData", {
  id: int("id").autoincrement().primaryKey(),
  // Movement on X axis (left-right)
  accelerationX: decimal("accelerationX", { precision: 10, scale: 4 }).notNull(),
  // Movement on Y axis (up-down)
  accelerationY: decimal("accelerationY", { precision: 10, scale: 4 }).notNull(),
  // Movement on Z axis (forward-backward)
  accelerationZ: decimal("accelerationZ", { precision: 10, scale: 4 }).notNull(),
  // Rotation on X axis
  rotationX: decimal("rotationX", { precision: 10, scale: 4 }).notNull(),
  // Rotation on Y axis
  rotationY: decimal("rotationY", { precision: 10, scale: 4 }).notNull(),
  // Rotation on Z axis
  rotationZ: decimal("rotationZ", { precision: 10, scale: 4 }).notNull(),
  // Device identifier (S20FE serial or UUID)
  deviceId: varchar("deviceId", { length: 128 }).notNull(),
  // Connection status
  isConnected: int("isConnected").default(1).notNull(),
  // Timestamp when data was received
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SensorData = typeof sensorData.$inferSelect;
export type InsertSensorData = typeof sensorData.$inferInsert;

// TODO: Add your tables here
