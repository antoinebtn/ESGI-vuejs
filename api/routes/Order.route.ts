import { Router, Request, Response } from 'express';

const router = Router();

router.get('/confirmation', (req: Request, res: Response) => {
  res.json({ status: 'success', message: 'Order confirmed' });
});
export default router;