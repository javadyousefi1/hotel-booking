import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/customError';
import config from '../constants/config';
import Joi from "joi";
import { hotelSchema } from '../validators/validator';
import { paginate } from '../utils/pagination.helper';


const prisma = new PrismaClient();



export const addHotel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        // Access uploaded files
        const imagePaths = (req.files as Express.Multer.File[]).map((file) => file.path);

        // Create the post in the database
        const newPost = await prisma.hotel.create({
            data: {
                title: req.body.title,
                desc: req.body.desc,
                images: imagePaths,
            },
        });


        res.status(201).json({ message: 'Hotel added successfully', });
    } catch (error) {
        next(error);
    }
}

export const getAllHotels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, perPage } = req.query;

        // Use the pagination helper
        const result = await paginate(prisma.hotel, {
            page: Number(page),
            perPage: Number(perPage)
        });

        res.json(result);
    } catch (error) {
        next(error);
    }
};
