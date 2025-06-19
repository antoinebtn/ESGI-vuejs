import { Request, Response } from 'express';
import { db } from '../service/db.service';
import { Product } from '../models/product.model';

export class ProductController {
  
  static async getAllProduct(req: Request, res: Response): Promise<void> {
    try {
      const categories = await db.query('SELECT * FROM products ORDER BY id ASC') as Product[];

      res.status(200).json({
        success: true,
        data: categories,
        message: 'Catégories récupérées avec succès'
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la récupération des catégories'
      });
    }
  }
}