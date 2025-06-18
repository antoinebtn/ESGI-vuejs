import { Router, Request, Response } from 'express';
import product from '../data/product.data.json'; 

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json(product);
});
export default router;