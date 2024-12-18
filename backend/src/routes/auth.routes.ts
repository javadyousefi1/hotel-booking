import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { loginSchema, registerSchema } from '../validators/validator';

const router = Router();



router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
