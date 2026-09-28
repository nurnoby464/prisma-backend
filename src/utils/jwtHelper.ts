import jwt, { type Secret } from "jsonwebtoken";
import type { StringValue } from "ms";

export interface ITokenPayload {
   userId: string;
  name: string;
  email: string;
  role: string;
}
interface IGenerateToken {
  data: ITokenPayload;
  secret: Secret;
  expiresIn: StringValue;
}

export interface IVerifyTokenResponse {
  userId: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface IVerifyTokenPayload {
  token: string;
  secret: string;
}

export const generateToken = (payload: IGenerateToken): string => {
  return jwt.sign(payload.data, payload.secret, {
    algorithm: "HS256",
    expiresIn: payload.expiresIn,
  });
};
export const verifyToken = (payload: IVerifyTokenPayload): IVerifyTokenResponse => {
  return jwt.verify(payload.token, payload.secret) as IVerifyTokenResponse;
};
