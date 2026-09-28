import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as UserService from "./user.service.js";

export const createUser = asyncHandler(async (req, res) => {
  const result = await UserService.createUser(req.body);
  ApiResponse.created({
    res,
    message: "User created successfully",
    data: result,
  });
});
