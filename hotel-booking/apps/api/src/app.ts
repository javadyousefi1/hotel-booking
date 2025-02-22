import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './modules/auth/auth.route';
import userRoutes from './modules/user/user.route';
import { errorHandler } from './middlewares/error.middleware';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: process.env.ALLOW_CORS_ORIGIN }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Setup Swagger
setupSwagger(app);


// Error handling middleware (placed after routes)
app.use(errorHandler);


export default app;
