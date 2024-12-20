import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { paginate } from './../utils/pagination.helper';
import { number } from 'joi';

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, perPage } = req.query;

        // Use the pagination helper
        const result = await paginate(prisma.user, {
            page: Number(page),
            perPage: Number(perPage)
        });

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // Assume the user ID is passed in the URL as a parameter
        const userId = parseInt(id, 10);

        // Attempt to delete the user
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        res.status(200).json({
            message: 'User deleted successfully',
            deletedUser,
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            // Prisma-specific error for "Record not found"
            res.status(404).json({
                error: 'User not found',
            });
        } else {
            next(error); // Pass unexpected errors to the global error handler
        }
    }
};

