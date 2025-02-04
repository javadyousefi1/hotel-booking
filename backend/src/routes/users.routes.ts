import { Router } from 'express';
import { deleteUser, getAllUsers } from '../controllers/users.controller';

const router = Router();



router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:id', deleteUser);

export default router;
