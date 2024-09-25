import express from 'express';
import { auth } from '../middlewares/auth.middleware';
import { addItem, cartCheckout, getCart,updateQuantity, removeItem } from '../controllers/cart.controller';

const router = express.Router();

router.use(auth);

router.get('/',getCart);
router.post('/add',addItem);
router.post('/update', updateQuantity);
router.post('/remove',removeItem);
router.post('/checkout',cartCheckout);

export default router;
