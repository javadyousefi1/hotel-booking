import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import { ImageController } from './image.controller';

// Initialize multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/'); // Define your upload directory
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 99999) + 1}.${extension}`;
    req.body.fileName = fileName;
    cb(null, fileName);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

// Middleware to check if a file is uploaded
const requireFile = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.file) {
    res.status(400).json({ message: 'Image file is required' });
    return; // Ensure we don't call next() after sending a response
  }
  next(); // Call next() to continue if file is present
};


// Initialize router
const router = Router();

// Save image endpoint with required file validation
router.post('/saveImage', upload.single('file'), requireFile, ImageController.saveImage);
router.get('/getAllImages', ImageController.getImage);

export default router;
