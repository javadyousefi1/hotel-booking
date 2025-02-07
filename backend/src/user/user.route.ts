import { Router } from 'express';
import { deleteUser, getAllUsers } from '../controllers/users.controller';
import { checkIsAdminMiddleware } from '../middlewares/auth.middleware';

const router = Router();




// users route  -> for post and get all
router.get('/users', checkIsAdminMiddleware, getAllUsers);
// users id -> for delete and  put,  path
router.delete('/users/:id', deleteUser);

export default router;
