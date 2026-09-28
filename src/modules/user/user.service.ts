import { prisma } from "../../lib/prisma.js";
import { useHashPassword } from "../../utils/helper.js";
import type { CreateUserInput } from "./user.validation.js";

export const createUser = async (payload: CreateUserInput) => {
  const { name, password, phone, email, role } = payload;
  const hasPassword = await useHashPassword(password);
  const newUser = await prisma.user.create({
    data: {
      name,
      password: hasPassword,
      ...(phone !== undefined && { phone }),
      email,
      role
    },
    omit: { password: true },
  });
  return newUser;
};
