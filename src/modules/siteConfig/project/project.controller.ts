import { ApiResponse } from "../../../utils/apiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { validateQuery } from "../../../utils/helper.js";
import * as ProjectService from "./project.service.js";
import type { GetProjectListQuery } from "./project.validation.js";

export const createProject = asyncHandler(async (req, res) => {
  const project = await ProjectService.createProject(req.body);
  ApiResponse.created({
    res,
    message: "Project created successfully",
    data: project,
  });
});

export const getProjectList = asyncHandler(async (req, res) => {
  const { total, page, limit, projects } = await ProjectService.getProjectList(
    validateQuery<GetProjectListQuery>(req),
  );
  ApiResponse.paginated({
    res,
    message: "Project get successfully",
    data: projects,
    total,
    page,
    limit,
  });
});

export const getProjectCategoryList = asyncHandler(async (_req, res) => {
  const result = await ProjectService.getProjectCategoryList();
  ApiResponse.success({
    res,
    message: "Project categories fetch successfully",
    data: result,
  });
});
export const deleteProject = asyncHandler(async (req, res) => {
  const result = await ProjectService.deleteProject(req.params.id as string);
  ApiResponse.success({
    res,
    message: "Project delete successfully",
    data: result,
  });
});

export const updateProject = asyncHandler(async (req, res) => {
  const result = await ProjectService.updateProject(req.params.id as string,req.body);
  ApiResponse.success({
    res,
    message: "Project updated successfully",
    data: result,
  });
});
