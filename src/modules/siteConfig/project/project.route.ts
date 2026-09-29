import { Router } from "express";
import { validate } from "../../../middlewares/zodValidate.js";
import { createProjectSchema } from "./project.validation.js";
import * as ProjectController from "./project.controller.js";

export const projectRouter = Router();
projectRouter.post(
  "/",
  validate({ body: createProjectSchema }),
  ProjectController.createProject,
);
