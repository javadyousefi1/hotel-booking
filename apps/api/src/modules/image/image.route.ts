import { Router } from 'express';
import multer from 'multer';
import { checkIsAdminMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { updateUserSchema } from '../../validators/validator';
import { ImageController } from './image.controller';

// Initialize multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/'); // Define your upload directory here
  },
  filename: (req, file, cb) => {
    const extention = file.originalname.split(".").at(-1)
    const fileName = Date.now() + '-' + Math.floor(Math.random() * (100000 - 1)) + 1 + "." + extention
    req.body.fileName = fileName
    cb(null, fileName); // You can customize the file name
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  // Check if the uploaded file is an image
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

// Apply multer middleware with storage and file filter
const upload = multer({ storage, fileFilter });

// Initialize router
const router = Router();

// Save image endpoint
router.post('/saveImage', upload.single('file'), ImageController.saveImage);

export default router;
