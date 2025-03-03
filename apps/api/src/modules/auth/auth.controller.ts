import { NextFunction, Request, Response } from 'express';
import { AuthService } from "./auth.service";
import config from '../../constants/config';
import { UserService } from '../user/user.service';

export const AuthController = {
    async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, name, password, isHost } = req.body;
            const { token, userRole } = await AuthService.register({ email, name, password, isHost });

            // Send the token as a cookie
            res.cookie(config.authToken, token, {
                httpOnly: true,
                maxAge: config.maxAge, // 1 hour
            });

            res.status(201).json({
                success: true,
                message: 'User registered successfully.',
                data: { name: name, email: email, role: userRole }
            });

        } catch (error) {
            next(error);
        }
    },
    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, name, password } = req.body;
            const { token } = await AuthService.login({ email, password });

            // Send the token as a cookie
            res.cookie(config.authToken, token, {
                httpOnly: true,
                maxAge: config.maxAge, // 1 hour
            });

            res.status(201).json({
                success: true,
                message: 'User login successfully.',
                data: { name: name, email: email }
            });

        } catch (error) {
            next(error);
        }
    },
    async getUserInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.cookies
            const result = await AuthService.checkAuth(token)
            if (result.success) {
                res.status(200).json({
                    success: true,
                    data: result.data
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "Not Authorized"
                });
            }

        } catch (error) {
            next(error);
        }
    },
    async logOutUser(req: Request, res: Response, next: NextFunction) {
        try {

            const result = await AuthService.logOut(req.cookies)
            if (result?.success) {
                res.clearCookie(config.authToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                });
                res.status(200).json({ message: "User logged out successfully" })
            } else {
                res.status(400).json({ message: "User not logged in before" })
            }



        } catch (error) {
            next(error);
        }
    },
    async verifyUserEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, code } = req.body

            const result = await AuthService.verifyEmail({ email, code })

            if (result?.success) {
                res.status(200).json({ statusCode: res.statusCode, message: result.message })
            } else {
                res.status(400).json({ statusCode: res.statusCode, message: result.message })
            }

        } catch (error) {
            next(error);
        }
    },
}