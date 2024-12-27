import { Router } from 'express';
import { addHotel, getAllHotels } from '../controllers/hotel.controller';
import upload from '../middlewares/upload.middleware';
import { validate } from '../middlewares/validation.middleware';
import { hotelSchema } from '../validators/validator';

const router = Router();


router.post('/addHotel', upload.array("images", 5), validate(hotelSchema), addHotel);
router.get('/getallhotels', getAllHotels);

export default router;
