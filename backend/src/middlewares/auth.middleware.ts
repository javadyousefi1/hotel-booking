import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/customError';
import config from '../constants/config';

const prisma = new PrismaClient();

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Retrieve the token from cookies or Authorization header
        const token = req.cookies[config.authToken] || req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new AppError('No token provided.', 401);
        }

        // Verify the token
        const decoded = verifyToken(token) as { userId: number };
        if (!decoded || !decoded.userId) {
            throw new AppError('Invalid token.', 401);
        }

        // Fetch the user from the database
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) {
            throw new AppError('User not found.', 404);
        }

        // Attach the user to the request object
        req.body.user = user;

        next();
    } catch (error) {
        next(error);
    }
};


export const checkIsAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Retrieve the token from cookies or Authorization header
        const token = req.cookies[config.authToken] || req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new AppError('No token provided.', 401);
        }

        // Verify the token
        const decoded = verifyToken(token) as { userId: number };
        if (!decoded || !decoded.userId) {
            throw new AppError('Invalid token.', 401);
        }

        // Fetch the user from the database
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) {
            throw new AppError('User not found.', 404);
        }

        // Attach the user to the request object
        
        if (!user.role.includes("admin")) {
            throw new AppError('Just admin can access to this endpoint.', 401);
        }
        
        req.body.user = user;

        next();
    } catch (error) {
        next(error);
    }
};
