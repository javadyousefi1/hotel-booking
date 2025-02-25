import { Router } from 'express';
import { UserController } from './user.controller';
import { checkIsAdminMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { updateUserSchema } from '../../validators/validator';

const router = Router();




// users route  -> for post and get all
router.get('/getAllUsers', UserController.getAllUsers);
// users id -> for delete and  put,  path
router.delete('/deleteUser/:id', UserController.deleteUser);
router.put('/updateUser', validate(updateUserSchema), UserController.updateUser);

export default router;
