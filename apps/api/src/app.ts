import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import imageRoutes from './modules/image/image.route';
import authRoutes from './modules/auth/auth.route';
import userRoutes from './modules/user/user.route';
import { errorHandler } from './middlewares/error.middleware';
import { setupSwagger } from './swagger';
import { createFolderIfNotExists } from './utils/path';
import path from 'path';
import { redisConnection, } from './redis/redis';

const uploadsPath = path.join(path.join(__dirname, '..'), 'uploads');
const imagesPath = path.join(uploadsPath, 'images');

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: process.env.ALLOW_CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
// Test Redis connection
redisConnection.ping().then((res) => console.log("Redis Connected:", res));

createFolderIfNotExists(uploadsPath)
createFolderIfNotExists(imagesPath)

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/image', imageRoutes);

// Error handling middleware (placed after routes)
app.use(errorHandler);

// Setup Swagger
setupSwagger(app);

export default app;
