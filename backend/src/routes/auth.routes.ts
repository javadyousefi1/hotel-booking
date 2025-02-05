import { Router } from 'express';
import { register, login, checkAuth, logOut, changeUserRole } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { loginSchema, registerSchema } from '../validators/validator';
import { authenticate, checkIsAdminMiddleware } from '../middlewares/auth.middleware';

const router = Router();


router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/log-out', logOut);
router.post('/changeUserRole', checkIsAdminMiddleware, changeUserRole)
// Protected route
router.get('/checkAuth', authenticate, checkAuth);

export default router;
