// src/server.ts
import { app } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";

// Vercel sets VERCEL=1. Serverless platforms run the app for us,
// so we only start our own HTTP server everywhere else
// (local dev, VPS, Docker, Railway).
const isServerless = Boolean(process.env["VERCEL"]);

async function startServer() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }

  const server = app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });

  async function shutdown() {
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

if (!isServerless) {
  void startServer();
}

// Vercel imports this. Locally it is simply unused.
export default app;