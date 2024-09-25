import express from 'express';
import { admin, auth } from '../middlewares/auth.middleware';

import {
  getAllOrders,
  getOrders,
  orderDetails,
} from '../controllers/order.controller';

const router = express.Router();

router.use(auth);

router.get('/', getOrders);
router.get('/all', admin, getAllOrders);
router.get('/details/:id', orderDetails);

export default router;
