import { Router, Request, Response } from 'express';
import productCat from '../data/product_categories.data.json'; 

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json(productCat);
});
export default router;