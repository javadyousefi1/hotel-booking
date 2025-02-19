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
        res.status(404).json({ error: deleteResult.error });
      } else {
        res.status(200).json({
          message: "User deleted successfully",
          deletedUser: { email: deleteResult.deletedUser?.email, name: deleteResult.deletedUser?.name, role: deleteResult.deletedUser?.role },
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name } = req.body;
      const updateResult = await UserService.updateUser({ name, id });

      if (!updateResult.success) {
        res.status(404).json({ error: updateResult.message });
      } else {
        res.status(200).json({
          message: "User deleted successfully",
          deletedUser: { name: updateResult.updatedUser?.name, email: updateResult.updatedUser?.email, role: updateResult.updatedUser?.role, },
        });
      }

    } catch (error) {
      next(error);
    }
  },
};
