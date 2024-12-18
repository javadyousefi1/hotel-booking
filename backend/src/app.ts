import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: process.env.ALLOW_CORS_ORIGIN })
);
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);


// Error handling middleware (placed after routes)
app.use(errorHandler);

export default app;
