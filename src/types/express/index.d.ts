import "express";
import type { ITokenPayload } from "../../utils/jwthelper.ts";

declare global {
  namespace Express {
    interface Request {
      user?: ITokenPayload;
    }
  }
}
