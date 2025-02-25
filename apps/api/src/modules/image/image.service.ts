import { PrismaClient } from "@prisma/client";
import { paginate } from "../../utils/pagination.helper";
import { IRegisterUserBody } from "../../interfaces/auth";

const prisma = new PrismaClient();

export const ImageService = {
  async createImage() {
    return {}
  },

};
