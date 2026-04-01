import { Router, Request, Response } from 'express';
import { db } from '../lib/db';
import { Order, CartItem } from '../models/index';

const router = Router();

// GET /api/orders
router.get('/', async (req: Request, res: Response) => {
  try {
    const ordersCollection = db.collection('orders');
    const docs = await ordersCollection.find();
    // Sort by timestamp descending
    const orders = docs.map(d => {
      const { _id, ...rest } = d;
      return { id: rest.id || _id, ...rest } as unknown as Order;
    }).sort((a, b) => b.timestamp - a.timestamp);
    
    res.json({ data: orders });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ordersCollection = db.collection('orders');
    const docs = await ordersCollection.find({ id });
    
    if (docs.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const { _id, ...rest } = docs[0];
    res.json({ data: { id: rest.id || _id, ...rest } as unknown as Order });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders
router.post('/', async (req: Request, res: Response) => {
  try {
    const { cartItems, total } = req.body;
    
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }
    
    const newOrderId = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    
    const newOrder: Order = {
      id: newOrderId,
      items: cartItems,
      total: Number(total),
      status: 'completed',
      timestamp: Date.now(),
    };
    
    const ordersCollection = db.collection('orders');
    await ordersCollection.insertOne(newOrder as unknown as Record<string, unknown>);
    
    // Clear cart upon successful order
    const cartCollection = db.collection('cart');
    const allCart = await cartCollection.find();
    for (const doc of allCart) {
      await cartCollection.deleteOne(doc._id);
    }
    
    res.json({ data: newOrder });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;