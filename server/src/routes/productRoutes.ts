import express from 'express';
import {
  getProductByName,
  getProductNames,
  getProducts,
} from '../controllers/productController';

const router = express.Router();

router.get('/names', getProductNames);
router.get('/:itemName', getProductByName);
router.get('/', getProducts);

export default router;
