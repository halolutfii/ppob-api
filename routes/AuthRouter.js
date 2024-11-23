import express from 'express';
import { createUser, getProfile, login, updateImage, updateProfile } from '../controllers/authController.js';
import { protectedMiddleware } from '../middleware/authMiddleware.js';
import upload from '../middleware/fileUpload.js'; 

const router = express.Router();

router.post('/register', createUser);
router.post('/login', login);
router.get('/profile', protectedMiddleware, getProfile);
router.put('/profile/update', protectedMiddleware, updateProfile);
router.put('/profile/image', protectedMiddleware, upload.single('profile_image'), updateImage);

export default router;