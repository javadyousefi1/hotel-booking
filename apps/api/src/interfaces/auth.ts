import { Request } from "express";

export interface IRegisterUserBody {
    email: string,
    password: string,
    name: string,
    isHost?: boolean
}

export interface IUserModal {
    id: number,
    name?: string,
    email: string,
    password: string,
    createdAt: Date,
    role: string[]
}

// Define interfaces for authenticated requests
export interface AuthenticatedRequest extends Request {
    userData?: IUserModal;
}