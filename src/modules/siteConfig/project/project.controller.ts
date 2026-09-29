import { ApiResponse } from "../../../utils/apiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import * as ProjectService from "./project.service.js";

export const createProject = asyncHandler(async (req, res) => {
  const project = await ProjectService.createProject(req.body);
  ApiResponse.created({
    res,
    message: "Project created successfully",
    data: project,
  });
});
