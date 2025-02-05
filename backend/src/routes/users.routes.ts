import { Router } from 'express';
import { deleteUser, getAllUsers } from '../controllers/users.controller';
import { checkIsAdminMiddleware } from '../middlewares/auth.middleware';

const router = Router();



router.get('/getAllUsers', checkIsAdminMiddleware, getAllUsers);
router.delete('/deleteUser/:id', deleteUser);

export default router;
