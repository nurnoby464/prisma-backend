import { Router } from "express";
import * as AuthController from "./auth.controller.js";
import { validate } from "../../middlewares/zodValidate.js";
import { loginSchema } from "./auth.validation.js";

export const authRoutes = Router();
authRoutes.post("/", validate({ body: loginSchema }), AuthController.login);
