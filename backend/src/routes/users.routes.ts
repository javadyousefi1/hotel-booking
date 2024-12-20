import { Router } from 'express';
import { getAllUsers } from '../controllers/users.controller';

const router = Router();



router.get('/getAllUsers', getAllUsers);

export default router;
