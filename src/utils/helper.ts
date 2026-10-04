import bcrypt from "bcryptjs";
import type { Request } from "express";

export const useHashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const useComparePassword = async (
  newPassword: string,
  existingPassword: string,
) => {
  return await bcrypt.compare(newPassword, existingPassword);
};

export const validateQuery = <T>(req: Request): T => {
  return req.query as unknown as T;
};
type ISkip = {
  page: number;
  limit: number;
};
export const useSkip = ({ page, limit }: ISkip): number => {
  return (page - 1) * limit;
};
