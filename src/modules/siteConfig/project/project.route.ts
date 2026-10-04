import { Router } from "express";
import { validate } from "../../../middlewares/zodValidate.js";
import {
  createProjectSchema,
  paramsSchema,
  projectListQuerySchema,
  updateProjectSchema,
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
projectRouter.get("/categories", ProjectController.getProjectCategoryList);

projectRouter.delete(
  "/:id",
  validate({ params: paramsSchema }),
  ProjectController.deleteProject,
);
projectRouter.put(
  "/:id",
  validate({ params: paramsSchema , body: updateProjectSchema }),
  ProjectController.updateProject,
);
