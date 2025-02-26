import { Request, Response, NextFunction } from "express";
import { ImageService, } from "./image.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const ImageController = {
  async getImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, perPage } = req.query;
      const result = await ImageService.getAllimages(
        Number(page),
        Number(perPage),
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  async saveImage(req: Request, res: Response, next: NextFunction) {
    try {
      const fileName = req.body.fileName

      const imageResult = await ImageService.createImage(fileName)

      res.json({ message: "image uploaded successfully", data: imageResult.data });
    } catch (error) {
      next(error);
    }
  },
};
