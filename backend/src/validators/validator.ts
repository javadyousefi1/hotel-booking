import Joi from "joi";

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    isHost: Joi.boolean()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const hotelSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    desc: Joi.string().min(10).max(500).required(),
});

export { loginSchema, registerSchema }