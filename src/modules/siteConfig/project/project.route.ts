import { Router } from "express";
import { validate } from "../../../middlewares/zodValidate.js";
import {
  createProjectSchema,
  projectListQuerySchema,
} from "./project.validation.js";
import * as ProjectController from "./project.controller.js";

export const projectRouter = Router();
projectRouter.post(
  "/",
  validate({ body: createProjectSchema }),
  ProjectController.createProject,
);
projectRouter.get(
  "/",
  validate({ query: projectListQuerySchema }),
  ProjectController.getProjectList,
);
projectRouter.get(
  "/project-categories",
  ProjectController.getProjectCategoryList,
);
