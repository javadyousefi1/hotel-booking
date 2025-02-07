import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";

export const UserController = {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, perPage } = req.query;
      const result = await UserService.getAllUsers(
        Number(page),
        Number(perPage),
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = parseInt(id, 10);

      const deleteResult = await UserService.deleteUser(userId);

      if (!deleteResult.success) {
        return res.status(404).json({ error: deleteResult.error });
      }

      res.status(200).json({
        message: "User deleted successfully",
        deletedUser: deleteResult.deletedUser,
      });
    } catch (error) {
      next(error);
    }
  },
};
