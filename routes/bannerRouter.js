import express from 'express';
import { getBanners } from '../controllers/bannerController.js';

const router = express.Router();

router.get('/banner', getBanners);

export default router;