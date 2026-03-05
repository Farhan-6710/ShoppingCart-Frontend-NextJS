import express from 'express';
import { submitFeedback } from '../controllers/feedbackController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);

router.post('/', submitFeedback);

export default router;
