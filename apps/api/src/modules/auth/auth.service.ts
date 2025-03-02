import { PrismaClient } from "@prisma/client";
import { IRegisterUserBody } from "../../interfaces/auth";
import { AppError } from "../../utils/customError";
// bcrypt
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from "../../utils/jwt";
import config from "../../constants/config";
import { profile } from "console";

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
                console.log(user)
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
};
