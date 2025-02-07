import { PrismaClient } from "@prisma/client";
import { paginate } from "../utils/pagination.helper";

const prisma = new PrismaClient();

export const UserService = {
  async getAllUsers(page: number, perPage: number) {
    return paginate(prisma.user, { page, perPage });
  },

  async deleteUser(userId: number) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: userId },
      });
      return { success: true, deletedUser };
    } catch (error: any) {
      if (error.code === "P2025") {
        return { success: false, error: "User not found" };
      }
      throw error;
    }
  },
};
