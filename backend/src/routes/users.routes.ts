import { Router } from 'express';
import { deleteUser, getAllUsers } from '../controllers/users.controller';

const router = Router();



router.get('/getAllUsers', getAllUsers);
router.get('/deleteUser/:id', deleteUser);

export default router;
