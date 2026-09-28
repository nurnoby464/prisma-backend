import { env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { ApiError } from "../../utils/ApiError.js";
import { useComparePassword } from "../../utils/helper.js";
import { generateToken, type ITokenPayload } from "../../utils/jwtHelper.js";
import type { LoginInput } from "./auth.validation.js";

export const login = async (payload: LoginInput) => {
  const { email, password } = payload;
  const existing = await prisma.user.findFirst({
    where: { email, isActive: true },
    select: {
      userId: true,
      email: true,
      name: true,
      password: true,
      role: true,
    },
  });
  if (!existing) throw new ApiError(401, "User not found");
  const matchPassword = await useComparePassword(password, existing.password);
  if (!matchPassword) throw new ApiError(401, "Invalid Password");
  const data: ITokenPayload = {
    name: existing.name,
    email: existing.email,
    userId: existing.userId,
    role: existing.role,
  };

  const accessToken = generateToken({
    data,
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  });

  const { password: _password, ...safeUser } = existing;

  return { user: safeUser, accessToken };
};
