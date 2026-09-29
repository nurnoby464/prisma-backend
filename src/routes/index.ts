import { Router } from "express";
import { healthRouter } from "../modules/health/health.routes.js";
import { userRouter } from "../modules/user/user.route.js";
import { authRoutes } from "../modules/auth/auth.routes.js";
import { projectRouter } from "../modules/siteConfig/project/project.route.js";

export const router = Router();
router.use("/health", healthRouter);
router.use("/users", userRouter);
router.use("/auth", authRoutes);
router.use("/site-config/projects", projectRouter);
