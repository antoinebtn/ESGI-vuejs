import { Request, Response } from 'express';
import { db } from '../service/db.service';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/orderItem.model';

export class OrderController {
  
  // Fonction utilitaire pour convertir les BigInt en nombres
  private static convertBigIntToNumber(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj === 'bigint') return Number(obj);
    if (typeof obj === 'object') {
      const converted: any = Array.isArray(obj) ? [] : {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (typeof value === 'bigint') {
            converted[key] = Number(value);
          } else if (key === 'total' && (value === null || value === undefined)) {
            // S'assurer que total a toujours une valeur numérique
            converted[key] = 0;
          } else {
            converted[key] = OrderController.convertBigIntToNumber(value);
          }
        }
      }
      return converted;
    }
    return obj;
  }
  
  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { userId = 1, items } = req.body; 
      
      if (!items || items.length === 0) {
        res.status(400).json({
          success: false,
          message: 'Aucun article dans la commande'
        });
        return;
      }

      const orderResult = await db.execute(
        'INSERT INTO orders (userId) VALUES (?)',
        [userId]
      );
      
      const orderId = Number(orderResult.insertId);

      for (const item of items) {
        await db.execute(
          'INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.id, item.quantity, item.price]
        );
      }

      res.status(201).json({
        success: true,
        data: OrderController.convertBigIntToNumber({
          orderId,
          message: 'Commande créée avec succès'
        })
      });

    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la création de la commande'
      });
    }
  }

  static async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const orders = await db.query('SELECT * FROM orders WHERE id = ?', [id]) as Order[];
      
      if (orders.length === 0) {
        res.status(404).json({
          success: false,
          message: 'Commande non trouvée'
        });
        return;
      }

      const orderItems = await db.query(`
        SELECT oi.*, p.name as productName 
        FROM order_items oi
        LEFT JOIN products p ON oi.productId = p.id
        WHERE oi.orderId = ?
      `, [id]) as OrderItem[];

      res.status(200).json({
        success: true,
        data: {
          order: OrderController.convertBigIntToNumber(orders[0]),
          items: OrderController.convertBigIntToNumber(orderItems)
        }
      });

    } catch (error) {
      console.error('Erreur lors de la récupération de la commande:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la récupération de la commande'
      });
    }
  }

  static async getOrdersByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      
      const orders = await db.query(`
        SELECT o.*, 
               COUNT(oi.id) as itemCount, 
               COALESCE(SUM(oi.price * oi.quantity), 0) as total
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.orderId
        WHERE o.userId = ?
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `, [userId]) as any[];

      const ordersWithItems = await Promise.all(
        orders.map(async (order) => {
          const orderItems = await db.query(`
            SELECT oi.*, p.name as productName, p.image as productImage
            FROM order_items oi
            LEFT JOIN products p ON oi.productId = p.id
            WHERE oi.orderId = ?
          `, [order.id]) as OrderItem[];

          return OrderController.convertBigIntToNumber({
            ...order,
            items: orderItems
          });
        })
      );

      res.status(200).json({
        success: true,
        data: ordersWithItems
      });

    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la récupération des commandes'
      });
    }
  }
}