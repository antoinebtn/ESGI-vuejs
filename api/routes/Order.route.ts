import { Router, Request, Response } from 'express';
import { OrderController } from '../controllers/Order.controller';

const router = Router();

router.post('/', OrderController.createOrder);

router.get('/user/:userId', OrderController.getOrdersByUserId);

router.get('/:id', OrderController.getOrderById);

export default router;