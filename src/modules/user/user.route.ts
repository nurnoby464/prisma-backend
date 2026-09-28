import { Router } from "express";
import * as UserController from "./user.controller.js";
import { validate } from "../../middlewares/zodValidate.js";
import { createUserSchema } from "./user.validation.js";

export const userRouter = Router();
userRouter.post(
  "/",
  validate({ body: createUserSchema }),
  UserController.createUser,
);
