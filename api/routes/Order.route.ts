import { Router, Request, Response } from 'express';
import { OrderController } from '../controllers/Order.controller';

const router = Router();

router.post('/', OrderController.createOrder);

router.get('/:id', OrderController.getOrderById);

router.get('/user/:userId', OrderController.getOrdersByUserId);

export default router;