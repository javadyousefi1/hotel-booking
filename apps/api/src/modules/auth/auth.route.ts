import { Router } from 'express';
import { loginSchema, registerSchema } from '../../validators/validator';
import { validate } from '../../middlewares/validation.middleware';
import { AuthController } from './auth.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();


router.post('/register', validate(registerSchema), AuthController.registerUser);
router.post('/login', validate(loginSchema), AuthController.loginUser);
router.post('/log-out', AuthController.logOutUser);
// router.post('/changeUserRole', checkIsAdminMiddleware, changeUserRole)
// Protected route
router.get('/checkAuth', AuthController.getUserInfo);

export default router;
