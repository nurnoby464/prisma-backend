import "express";
import type { ITokenPayload } from "../../utils/jwtHelper.ts";

declare global {
  namespace Express {
    interface Request {
      user?: ITokenPayload;
    }
  }
}
