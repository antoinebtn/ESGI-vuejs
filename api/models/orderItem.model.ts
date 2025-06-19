export interface OrderItem { 
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number; // Price per unit at the time of order
  createdAt: Date;
  updatedAt: Date;
}