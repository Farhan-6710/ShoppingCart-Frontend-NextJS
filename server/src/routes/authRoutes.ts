import express from 'express';
import {
  signup,
  login,
  logout,
  getMe,
  googleAuthInit,
  googleAuthCallback,
} from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

router.get('/google', googleAuthInit);
router.get('/google/callback', googleAuthCallback);

export default router;
