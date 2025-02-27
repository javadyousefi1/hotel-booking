import { PrismaClient } from "@prisma/client";
import { paginate } from "../../utils/pagination.helper";
import * as path from 'path';
import * as fs from 'fs';


const prisma = new PrismaClient();

export const ImageService = {
  async createImage(fileName: string) {
    const imagePath = "/uploads/images/" + fileName
    try {
      const createdImage = await prisma.image.create({ data: { path: imagePath } })
      return { data: createdImage, success: true }
    } catch (error) {
      const willDeletedImagePath = path.join(__dirname, "..", "..", "..", imagePath);
      fs.unlink(willDeletedImagePath, (err) => {
        if (err) throw err
      })
      throw error;
    }
  },

  async getAllimages(page: number, perPage: number) {
    return paginate(prisma.image, { page, perPage });
  },

};
