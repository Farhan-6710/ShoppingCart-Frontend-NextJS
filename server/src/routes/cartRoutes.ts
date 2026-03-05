import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from '../controllers/cartController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect); // Protect all cart routes

router.get('/', getCart);
router.post('/', addToCart);
router.put('/', updateCartItem);
router.delete('/', removeFromCart);

export default router;
