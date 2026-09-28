import bcrypt from "bcryptjs";

export const useHashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const useComparePassword = async (
  newPassword: string,
  existingPassword: string,
) => {
  return await bcrypt.compare(newPassword, existingPassword);
};
