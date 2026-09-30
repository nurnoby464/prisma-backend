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
    message: "Project created successfully",
    data: projects,
    total,
    page,
    limit,
  });
});

export const getProjectCategoryList = asyncHandler(async (req, res) => {
  const result = await ProjectService.getProjectCategoryList();
  ApiResponse.success({
    res,
    message: "Project categories fetch successfully",
    data: result,
  });
});
