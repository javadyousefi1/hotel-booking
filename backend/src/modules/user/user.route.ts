import { Router } from 'express';
import { UserController } from './user.controller';
import { checkIsAdminMiddleware } from '../../middlewares/auth.middleware';

const router = Router();




// users route  -> for post and get all
router.get('/getAllUsers', UserController.getAllUsers);
// users id -> for delete and  put,  path
router.delete('/deleteUser/:id', UserController.deleteUser);

export default router;
