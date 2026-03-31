import { Router, Request, Response } from 'express';
import { db } from '../lib/db';
import type { GameStateData } from '../models/types';

const router = Router();
// Store game state in the db under a single generic document, or use in-memory state.
// Because it's a simple global session, we can just use a single document ID.
const GLOBAL_GAME_ID = 'global-game-session';
const gameSessions = db.collection('gameSessions');

// Helper to initialize or get the global game session
async function getGlobalSession(): Promise<GameStateData & { _id: string }> {
  const sessions = await gameSessions.find({ id: GLOBAL_GAME_ID });
  if (sessions.length === 0) {
    const defaultSession = { id: GLOBAL_GAME_ID, currentScore: 0, fishCaughtThisSession: [] };
    const _id = await gameSessions.insertOne(defaultSession);
    return { ...defaultSession, _id };
  }
  return sessions[0] as unknown as (GameStateData & { _id: string });
}

router.get('/', async (_req: Request, res: Response) => {
  try {
    const session = await getGlobalSession();
    res.json({ 
      data: {
        currentScore: session.currentScore,
        fishCaughtThisSession: session.fishCaughtThisSession
      } 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/start', async (_req: Request, res: Response) => {
  try {
    const session = await getGlobalSession();
    const updatedState = { currentScore: 0, fishCaughtThisSession: [] };
    
    await gameSessions.updateOne(session._id, updatedState);
    
    res.json({ data: updatedState });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/catch', async (req: Request, res: Response) => {
  try {
    const { fish } = req.body;
    if (!fish) {
      return res.status(400).json({ error: 'Missing fish payload' });
    }

    const session = await getGlobalSession();
    const newScore = session.currentScore + (fish.points || 0);
    const newCaughtArray = [...session.fishCaughtThisSession, fish];

    await gameSessions.updateOne(session._id, {
      currentScore: newScore,
      fishCaughtThisSession: newCaughtArray
    });

    res.json({
      data: {
        currentScore: newScore,
        fishCaughtThisSession: newCaughtArray
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;