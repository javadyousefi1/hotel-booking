import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { paginate } from './../utils/pagination.helper';

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
