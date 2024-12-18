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
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });
        console.log(user)
        // Generate JWT token
        const token = generateToken(user.id);

        // Send the token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: config.maxAge, // 1 hour
        });

        res.status(201).json({ message: 'User registered successfully.' });
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
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: config.maxAge, // 1 hour
        });

        res.status(200).json({
            success: true,
            message: 'Login successful.',
        });
    } catch (error) {
        next(error); // Pass errors to the error handler middleware
    }
};
