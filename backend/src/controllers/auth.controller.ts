import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/customError';
import config from '../constants/config';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;
    try {
        // check if email already be in db
        const alreadExist = await prisma.user.findUnique({ where: { email } });

        if (alreadExist) {
            throw new AppError("an user already exsited with this email", 400)
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });
        // Generate JWT token
        const token = generateToken(user.id);

        // Send the token as a cookie
        res.cookie(config.authToken, token, {
            httpOnly: true,
            maxAge: config.maxAge, // 1 hour
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            data: { name: user.name, email: user.email }
        });
    } catch (error) {
        next(error);
    }
};
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new AppError('Invalid email or password.', 401);
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError('Invalid email or password.', 401);
        }

        // Generate JWT token
        const token = generateToken(user.id);

        // Send the token as a cookie
        res.cookie(config.authToken, token, {
            httpOnly: true,
            maxAge: config.maxAge, // 1 hour
        });

        res.status(200).json({
            success: true,
            message: 'Login successful.',
            data: { name: user.name, email: user.email }
        });
    } catch (error) {
        next(error); // Pass errors to the error handler middleware
    }
};

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        // The authenticated user is attached to req.body.user by the middleware
        const user = req.body.user;
        res.status(200).json({
            success: true,
            data: {
                // id: user.id,
                name: user.name,
                email: user.email,
                // createdAt: user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie(config.authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ message: "user log out successfully" })
    } catch (error) {
        next(error)
    }
}