import { Request, Response, NextFunction } from "express";
import { ImageService, } from "./image.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const ImageController = {
  async saveImage(req: Request, res: Response, next: NextFunction) {
    try {
      const fileName = req.body.fileName
      const path = "/uploads/images/" + fileName
      const createdImage = await prisma.image.create({ data: { path: path } })
      console.log(createdImage ,"createdImage")
      
      res.json({ message: "result" });
    } catch (error) {
      next(error);
    }
  },
};
