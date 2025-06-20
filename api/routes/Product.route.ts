import { Router, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { db } from '../service/db.service';
import { Product as ProductModel } from '../models/product.model';

const router = Router();

interface ProductWithImage {
  id: number;
  name: string;
  price: number;
  category: number;
  image: string;
  imageFileName: string;
  description: string;
}

const encodeImageToBase64 = (imagePath: string): string | null => {
  try {
    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
      return imageBuffer.toString('base64');
    }
    return null;
  } catch (error) {
    console.error(`Erreur lors de l'encodage de l'image ${imagePath}:`, error);
    return null;
  }
};

router.get('/', async (req: Request, res: Response) => {
  try {
    const imgDir = path.join(__dirname, '../data/img');

    const productData = await db.query('SELECT * FROM products ORDER BY id ASC') as ProductModel[];
    
    const productsWithImages: ProductWithImage[] = productData.map((product: ProductModel) => {
      const imageFilePath = path.join(imgDir, product.imageFileName);
      const base64Image = encodeImageToBase64(imageFilePath);
      return {
        ...product,
        image: base64Image || '', 
      };
    })

    const productsWithValidImages = productsWithImages.filter(product => product.image !== '');
    
    res.status(200).json({
      success: true,
      data: productsWithValidImages,
      total: productsWithValidImages.length,
      message: 'Produits récupérés avec succès'
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});

export default router;