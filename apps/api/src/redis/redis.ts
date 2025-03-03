import Redis from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.REDIS_IP, "1")
const redis = new Redis({
    host: process.env.REDIS_IP, // Default Redis host
    port: process.env.REDIS_PORT || 6379, // Default Redis port
    password: process.env.REDIS_PASSWORD, // Add if Redis requires authentication
});


export { redis }