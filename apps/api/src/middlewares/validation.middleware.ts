import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from '../utils/customError';

export const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(new AppError(error.details[0].message, 400));
        } else {
            next();
        }
    };
};
