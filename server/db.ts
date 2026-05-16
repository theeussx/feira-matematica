import dotenv from "dotenv";
import { createPool, Pool } from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

dotenv.config();

let dbInstance: any = null;

async function waitForDb(pool: Pool, retries = 10, delayMs = 2000) {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const conn = await pool.getConnection();
      await conn.ping();
      conn.release();
      return;
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

async function ensureSensorTable(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS sensorData (
      id INT AUTO_INCREMENT PRIMARY KEY,
      accelerationX DECIMAL(10,4) NOT NULL,
      accelerationY DECIMAL(10,4) NOT NULL,
      accelerationZ DECIMAL(10,4) NOT NULL,
      rotationX DECIMAL(10,4) NOT NULL,
      rotationY DECIMAL(10,4) NOT NULL,
      rotationZ DECIMAL(10,4) NOT NULL,
      deviceId VARCHAR(128) NOT NULL,
      isConnected INT NOT NULL DEFAULT 1,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

export async function getDb(): Promise<any> {
  if (dbInstance) return dbInstance;

  const pool = createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "feira",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  await waitForDb(pool);
  await ensureSensorTable(pool);

  dbInstance = drizzle(pool);
  return dbInstance;
}

export default getDb;
