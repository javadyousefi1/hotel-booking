import { PrismaClient } from "@prisma/client";
import { paginate } from "../../utils/pagination.helper";

const prisma = new PrismaClient();

export const ImageService = {
  async createImage(fileName: string) {
    try {
      const path = "/uploads/images/" + fileName
      const createdImage = await prisma.image.create({ data: { path: path } })
      return { data: createdImage, success: true }
    } catch (error) {
      throw error;
    }
  },

  async getAllimages(page: number, perPage: number) {
    return paginate(prisma.image, { page, perPage });
  },

};
