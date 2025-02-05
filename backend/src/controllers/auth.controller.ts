import { NextFunction, Request, Response } from 'express';
// bcrypt
import bcrypt from 'bcrypt';
// helper
import { generateToken } from '../utils/jwt';
// prisma
import { PrismaClient } from '@prisma/client';
// constant
import config from '../constants/config';
// helper
import { AppError } from '../utils/customError';

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
            data: { email, password: hashedPassword, name, role: ["user"] },
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
                name: user.name,
                email: user.email,
                role: user.role
            },
        });
    } catch (error) {
        next(error);
    }
};
export const changeUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = req.body.user
        const newRole = req.body.role;
        await prisma.user.update({ where: { id: userData.id }, data: { ...userData, role: newRole } })
        res.status(200).json({ message: "user role changes succesfully" })
    } catch (error) {
        next(error)
    }
}
export const logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!(config.authToken in req.cookies)) {
            res.status(400).json({ message: "user already logged out!" })
        }

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