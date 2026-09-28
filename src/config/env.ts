import "dotenv/config";
import { z } from "zod";
import type { StringValue } from "ms";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().min(1),
  CLIENT_URL: z.string().default("http://localhost:5173"),

  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z
    .string()
    .regex(
      /^\d+(ms|s|m|h|d|w|y)$/,
      "Must be a valid duration like '30d', '1h', '15m'",
    )
    .default("30d").transform((val)=> val as StringValue)
});

export const env = envSchema.parse(process.env);
