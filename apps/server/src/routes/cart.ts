import { Router, Request, Response } from 'express';
import { db } from '../lib/db';
import { CartItem } from '../models/index';

const router = Router();

// GET /api/cart
router.get('/', async (req: Request, res: Response) => {
  try {
    const cartCollection = db.collection('cart');
    const docs = await cartCollection.find();
    const items = docs.map(d => {
      const { _id, ...rest } = d;
      return rest as unknown as CartItem;
    });
    res.json({ data: items });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/cart
router.post('/', async (req: Request, res: Response) => {
  try {
    const { item, quantity, restaurantName } = req.body;
    if (!item || !quantity || !restaurantName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const cartCollection = db.collection('cart');
    const existing = await cartCollection.find({ menuItemId: item.id });
    
    if (existing.length > 0) {
      const current = existing[0];
      await cartCollection.updateOne(current._id, { quantity: Number(current.quantity) + Number(quantity) });
    } else {
      const newCartItem: CartItem = {
        menuItemId: item.id,
        restaurantId: item.restaurantId,
        restaurantName,
        name: item.name,
        price: item.price,
        quantity: Number(quantity),
      };
      await cartCollection.insertOne(newCartItem as unknown as Record<string, unknown>);
    }
    
    // return updated cart
    const updatedDocs = await cartCollection.find();
    const updatedItems = updatedDocs.map(d => {
      const { _id, ...rest } = d;
      return rest as unknown as CartItem;
    });
    
    res.json({ data: updatedItems });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/cart/:menuItemId
router.put('/:menuItemId', async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const { menuItemId } = req.params;
    
    const cartCollection = db.collection('cart');
    const existing = await cartCollection.find({ menuItemId });
    
    if (existing.length > 0) {
      if (quantity <= 0) {
        await cartCollection.deleteOne(existing[0]._id);
      } else {
        await cartCollection.updateOne(existing[0]._id, { quantity: Number(quantity) });
      }
    }
    
    const updatedDocs = await cartCollection.find();
    const updatedItems = updatedDocs.map(d => {
      const { _id, ...rest } = d;
      return rest as unknown as CartItem;
    });
    
    res.json({ data: updatedItems });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/cart/:menuItemId
router.delete('/:menuItemId', async (req: Request, res: Response) => {
  try {
    const { menuItemId } = req.params;
    const cartCollection = db.collection('cart');
    
    // Find all items with this menuItemId (should be 1) and delete them
    const existing = await cartCollection.find({ menuItemId });
    for (const doc of existing) {
      await cartCollection.deleteOne(doc._id);
    }
    
    const updatedDocs = await cartCollection.find();
    const updatedItems = updatedDocs.map(d => {
      const { _id, ...rest } = d;
      return rest as unknown as CartItem;
    });
    
    res.json({ data: updatedItems });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/cart
router.delete('/', async (req: Request, res: Response) => {
  try {
    const cartCollection = db.collection('cart');
    const all = await cartCollection.find();
    for (const doc of all) {
      await cartCollection.deleteOne(doc._id);
    }
    res.json({ data: [] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;