import { Router, Request, Response } from 'express';
import { db } from '../lib/db';
import type { CaughtFish } from '../models/types';

const router = Router();
const collection = db.collection('collection');

router.get('/', async (_req: Request, res: Response) => {
  try {
    const allFish = await collection.find();
    
    // Convert to Record<string, CaughtFish> for frontend
    const record: Record<string, CaughtFish> = {};
    for (const f of allFish as any[]) {
      record[f.fishId] = { fishId: f.fishId, count: f.count };
    }
    
    res.json({ data: record });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { fish } = req.body;
    
    if (!fish || !fish.id) {
      return res.status(400).json({ error: 'Invalid fish payload' });
    }

    const existing = await collection.find({ fishId: fish.id });
    if (existing.length > 0) {
      const doc = existing[0];
      await collection.updateOne(doc._id as string, { count: (doc.count as number) + 1 });
    } else {
      await collection.insertOne({ fishId: fish.id, count: 1 });
    }

    const allFish = await collection.find();
    
    // Convert to Record<string, CaughtFish>
    const record: Record<string, CaughtFish> = {};
    for (const f of allFish as any[]) {
      record[f.fishId] = { fishId: f.fishId, count: f.count };
    }
    
    res.json({ data: record });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;