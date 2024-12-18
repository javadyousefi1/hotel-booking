import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import Joi from 'joi';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});


router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
