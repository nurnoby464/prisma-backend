import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as AuthServices from "./auth.service.js";

export const login = asyncHandler(async (req, res) => {
  const result = await AuthServices.login(req.body);
  ApiResponse.success({
    res,
    message: "Login successfully",
    data: result,
  });
});
