import { Request, Response, NextFunction } from "express";
import { ImageService, } from "./image.service";

export const ImageController = {
  async saveImage(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.file)
      console.log(req.files)
      console.log(req.body)
      const result = await ImageService.createImage(
      );
      res.json({ message: "result" });
    } catch (error) {
      next(error);
    }
  },
};
