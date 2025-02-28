import { Router } from 'express';
import { ImageController } from './image.controller';
import { requireFile, upload } from '../../middlewares/upload.middleware';

// Initialize router
const router = Router();

// Save image endpoint with required file validation
router.post('/saveImage', upload.array('file', 5), requireFile, ImageController.saveImage);
router.get('/getAllImages', ImageController.getImage);

export default router;
