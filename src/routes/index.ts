import { Router } from "express";
import { healthRouter } from "../modules/health/health.routes.js";
import { userRouter } from "../modules/user/user.route.js";
import { authRoutes } from "../modules/auth/auth.routes.js";

export const router = Router();
router.use("/health",healthRouter)
router.use("/users",userRouter)
router.use("/auth",authRoutes)