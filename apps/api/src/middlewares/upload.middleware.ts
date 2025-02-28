import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

// Configure Multer storage

// Initialize multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/'); // Define your upload directory
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 99999) + 1}.${extension}`;
    
    if (!req.body.fileName) {
      req.body.fileName = [fileName]
    }else {
      req.body.fileName.push(fileName);
    }
    cb(null, fileName);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter });

// Middleware to check if a file is uploaded
export const requireFile = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.file && req.files?.length === 0) {
    res.status(400).json({ message: 'Image file is required' });
    return; // Ensure we don't call next() after sending a response
  }
  next(); // Call next() to continue if file is present
};
