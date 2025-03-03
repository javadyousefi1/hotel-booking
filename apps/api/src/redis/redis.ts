import Redis from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

const redisConnection = new Redis({
    host: process.env.REDIS_IP, // Default Redis host
    port: Number(process.env.REDIS_PORT) || 6379, // Default Redis port
    password: process.env.REDIS_PASSWORD, // Add if Redis requires authentication
});


export { redisConnection}