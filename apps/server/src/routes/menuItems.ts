import { Router, Request, Response } from 'express';
import { db } from '../lib/db';
import { MenuItem } from '../models/index';

const router = Router();

// GET /api/menu-items
router.get('/', async (req: Request, res: Response) => {
  try {
    const menuItemsCollection = db.collection('menuItems');
    const docs = await menuItemsCollection.find();
    const items = docs.map(d => {
      const { _id, ...rest } = d;
      return { id: rest.id || _id, ...rest } as MenuItem;
    });
    res.json({ data: items });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;