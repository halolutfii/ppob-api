import express from 'express';
import { getServices } from '../controllers/serviceController.js';
import { protectedMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/services', protectedMiddleware, getServices);

export default router;