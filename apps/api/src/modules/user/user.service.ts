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

  async updateUser(body: { id: number, name: string, userIdFromToken: number }) {
    try {
      const isIdValid = await prisma.user.findFirst({ where: { id: body.id } });

      // if user id not valid
      if (!isIdValid) {
        return { success: false, message: "User id is not valid" };
      }

      // if other user with an other user id send a request , can not modifier the account detail
      if (isIdValid && body.userIdFromToken !== isIdValid.id) {
        return { success: false, message: `Only the user with id (${body.userIdFromToken}) can change info of account` };
      }

      // update user info
      const updatedUser = await prisma.user.update({
        where: { id: body.id }, data: {
          name: body.name
        }
      });

      return { success: true, updatedUser };
    } catch (error: any) {
      throw error;
    }
  },

  async updateProfile(body: { imageId: number, userId: number }) {
    try {
      const { userId } = body
      // await prisma.user.update({
      //   where: { id: userId }, data: {
      //     profileImageId: 2
      //   }
      // })

      // return { success: true, updatedUser };
    } catch (error: any) {
      throw error;
    }
  }
};
