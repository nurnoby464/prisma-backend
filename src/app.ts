import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import { router } from "./routes/index.js";
import helmet from "helmet";
import morgan from "morgan";

export const app = express();
app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());

app.use("/api/v1", router);
app.get("/", (_req, res) => {
  res.json({ success: true, message: "Server  are running" });
});

app.use(notFound);
app.use(errorHandler);
