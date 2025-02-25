import { Router } from 'express';
import { checkIsAdminMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { updateUserSchema } from '../../validators/validator';
import { ImageController } from './image.controller';

const router = Router();





router.post('/saveImage', ImageController.saveImage);


export default router;
