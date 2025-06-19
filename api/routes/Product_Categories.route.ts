import { Router, Request, Response } from 'express';
import { ProductCategoriesController } from '../controllers/Product_Categories.controller';


const router = Router();

router.get('/', ProductCategoriesController.getAllCategories)
export default router;