import { PrismaClient } from "@prisma/client";
import { paginate } from "../../utils/pagination.helper";
import { IRegisterUserBody } from "../../interfaces/auth";

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

  async updateUser(body: { id: number, name: string }) {
    try {

      const isIdValid = await prisma.user.findFirst({ where: { id: body.id } })

      if (!isIdValid) {
        return { success: false, message: "User id is not valid" };
      }

      const updatedUser = await prisma.user.update({
        where: { id: body.id }, data: {
          name: body.name
        }
      });
      return { success: true, updatedUser };
    } catch (error: any) {
      throw error;
    }
  }
};
