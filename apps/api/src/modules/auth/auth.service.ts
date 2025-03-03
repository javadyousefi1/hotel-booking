import { PrismaClient } from "@prisma/client";
import { IRegisterUserBody } from "../../interfaces/auth";
import { AppError } from "../../utils/customError";
// bcrypt
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from "../../utils/jwt";
import config from "../../constants/config";
import { profile } from "console";
import { sendEmailVerify } from "../../utils/email";
import { redisConnection } from "../../redis/redis";

const prisma = new PrismaClient();

export const AuthService = {
    async register(body: IRegisterUserBody) {
        try {
            const { email, name, password, isHost } = body
            const userRole = isHost ? [config.userRoles.HOST] : [config.userRoles.USER];

            // check if email already be in db
            const alreadExist = await prisma.user.findUnique({ where: { email, } })

            if (alreadExist) {

                if (alreadExist.role.includes(config.userRoles.HOST) && alreadExist.role.includes(config.userRoles.USER)) {
                    throw new AppError("you have account with user and host role", 400)
                } else if (alreadExist.role.includes(userRole[0])) {
                    throw new AppError("you have account with this email", 400)
                } else {
                    const updatedResult = await prisma.user.update({
                        where: { email }, data: {
                            role: {
                                push: userRole[0]
                            }
                        }
                    })
                    // Generate JWT token
                    const token = generateToken(alreadExist.id);

                    return { success: true, token, userRole: updatedResult.role };
                }
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await prisma.user.create({
                    data: { email, password: hashedPassword, name, role: userRole },
                });

                // Generate a random 6-digit number
                const randomSixDigit = Math.floor(Math.random() * 900000) + 100000;
                await redisConnection.set(user.email, randomSixDigit, "EX", config.verifyCodeExp)
                await sendEmailVerify(user.email, randomSixDigit)

                // Generate JWT token
                const token = generateToken(user.id);

                return { success: true, token, userRole };
            }

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
                const user = await prisma.user.findUnique({ where: { id: result.userId }, include: { profileImage: true } });
                if (!user) throw { message: "user not found" }
                const profile = user.profileImage?.path ? user.profileImage?.path[0] : null
                return { success: true, data: { name: user?.name, email: user?.email, role: user?.role, profile } };
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
    async verifyEmail(body: { email: string, code: number }) {
        try {
            const { email, code } = body

            const isEmailValid = await prisma.user.findFirst({ where: { email } })
            if (!isEmailValid) return { success: false, message: "email is not valid" }
            if (isEmailValid.isVerify) return { success: false, message: "user email already valid" }

            const theValidCode = await redisConnection.get(email)

            if (Number(code) === Number(theValidCode)) {
                await prisma.user.update({ where: { email }, data: { isVerify: true } })
                await redisConnection.del(email)
                return { success: true, message: "user email verify" }
            } else {
                return { success: false, message: "the code is wrong" }
            }
        } catch (error: any) {
            throw error;
        }
    },
};
