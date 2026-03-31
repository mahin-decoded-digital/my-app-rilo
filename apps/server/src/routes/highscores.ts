import { Router, Request, Response } from 'express';
import { db } from '../lib/db';
import type { PlayerSession } from '../models/types';
import crypto from 'crypto';

const router = Router();
const highscores = db.collection('highscores');

router.get('/', async (_req: Request, res: Response) => {
  try {
    const scores = await highscores.find();
    // Sort scores
    const sortedScores = (scores as unknown as PlayerSession[])
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.timestamp - a.timestamp;
      })
      .slice(0, 10);
    res.json({ data: sortedScores });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { score, fishCaughtCount } = req.body;
    
    if (typeof score !== 'number' || typeof fishCaughtCount !== 'number') {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const newSession: PlayerSession = {
      id: crypto.randomUUID(),
      score,
      fishCaughtCount,
      timestamp: Date.now()
    };

    await highscores.insertOne(newSession as any);

    const scores = await highscores.find();
    const sortedScores = (scores as unknown as PlayerSession[])
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.timestamp - a.timestamp;
      })
      .slice(0, 10);

    // Keep only top 10 in DB, optional cleanup
    if (scores.length > 10) {
      const toDelete = scores.filter(s => !sortedScores.find(top => top.id === s.id));
      for (const s of toDelete) {
        if (s._id) await highscores.deleteOne(s._id);
      }
    }

    res.json({ data: sortedScores });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;