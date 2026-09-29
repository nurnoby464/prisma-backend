import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { Prisma } from "../generated/prisma/client.js";

export function notFound(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err);
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res
        .status(409)
        .json({
          success: false,
          message: "A record with this unique value already exists",
        });
      return;
    }
    if (err.code === "P2025") {
      res.status(404).json({ success: false, message: "Record not found" });
      return;
    }
  }
  const message = err instanceof Error ? err.message : "Internal server error";
  res.status(500).json({ success: false, message });
}
