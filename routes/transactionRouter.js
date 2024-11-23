import express from 'express';
import { balance, topup, transaction, transactionHistory } from '../controllers/transactionController.js';
import { protectedMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/balance', protectedMiddleware, balance);
router.post('/topup', protectedMiddleware, topup)
router.get('/transaction/history', protectedMiddleware, transactionHistory)
router.post('/transaction', protectedMiddleware, transaction)

export default router;