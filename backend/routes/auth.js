import express from 'express';
import { signup, login, googleAuth, getMe, verifyEmail, forgotPassword, resetPassword } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected route to get current user session
router.get('/me', requireAuth, getMe);

export default router;
