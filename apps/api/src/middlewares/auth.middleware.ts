import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/customError';
import config from '../constants/config';
import { AuthenticatedRequest, IUserModal } from '../interfaces/auth';

const prisma = new PrismaClient();

// Define interfaces for authenticated requests


export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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
        const user = await prisma.user.findFirst({
            where: { id: decoded.userId }
        });

        if (!user) {
            throw new AppError('User not found.', 404);
        } else {
            req.userData = user
        }



        next();
    } catch (error) {
        console.log(error, "1");
        next(error);
    }
};

// export const checkIsAdminMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//         // Retrieve the token from cookies or Authorization header
//         const token = req.cookies[config.authToken] || req.headers.authorization?.split(' ')[1];

//         if (!token) {
//             throw new AppError('No token provided.', 401);
//         }

//         // Verify the token
//         const decoded = verifyToken(token) as { userId: number };

//         if (!decoded || !decoded.userId) {
//             throw new AppError('Invalid token.', 401);
//         }

//         // Fetch the user from the database
//         const user = await prisma.user.findUnique({
//             where: { id: decoded.userId }
//         });

//         if (!user) {
//             throw new AppError('User not found.', 404);
//         }

//         // Attach the user to the request object
//         req.user = user;  // Changed from req.body.user

//         // Check admin role
//         if (!user.role?.includes("admin")) {
//             throw new AppError('Just admin can access to this endpoint.', 401);
//         }

//         next();
//     } catch (error) {
//         next(error);
//     }
// };