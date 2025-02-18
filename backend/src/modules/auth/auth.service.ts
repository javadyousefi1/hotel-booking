import { PrismaClient } from "@prisma/client";
import { IRegisterUserBody } from "../../interfaces/auth";
import { AppError } from "../../utils/customError";
// bcrypt
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from "../../utils/jwt";
import config from "../../constants/config";

const prisma = new PrismaClient();

export const AuthService = {
    async register(body: IRegisterUserBody) {
        try {
            const { email, name, password } = body
            // check if email already be in db
            const alreadExist = await prisma.user.findUnique({ where: { email } });

            if (alreadExist) {
                throw new AppError("an user already exsited with this email", 400)
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: { email, password: hashedPassword, name, },
            });
            // Generate JWT token
            const token = generateToken(user.id);

            return { success: true, token };
        } catch (error: any) {
            if (error.code === "P2025") {
                return { success: false, error: "User not found" };
            }
            throw error;
        }
    },
    async login(body: Omit<IRegisterUserBody, "name">) {
        try {
            const { email, password } = body

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

            return { success: true, token };
        } catch (error: any) {
            if (error.code === "P2025") {
                return { success: false, error: "User not found" };
            }
            throw error;
        }
    },
    async checkAuth(token: string) {
        try {
            const result = verifyToken(token)
            if (typeof result === "object" && "userId" in result) {
                const user = await prisma.user.findUnique({ where: { id: result.userId } });
                return { success: true, data: { name: user?.name, email: user?.email } };
            } else {
                return { success: false }
            }
        } catch (error: any) {
            if (error.code === "P2025") {
                return { success: false, error: "User not found" };
            }
            throw error;
        }
    },
    async logOut(cookies: object) {
        try {
            if (!(config.authToken in cookies)) {
                return { success: false, }
            } else {
                return { success: true }
            }
        } catch (error: any) {
            if (error.code === "P2025") {
                return { success: false, error: "User not found" };
            }
            throw error;
        }
    },
};
