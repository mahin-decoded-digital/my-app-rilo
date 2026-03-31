export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export interface Fish {
  id: string;
  name: string;
  points: number;
  rarity: Rarity;
  imageUrl: string;
}

export interface CaughtFish {
  fishId: string;
  count: number;
}

export interface PlayerSession {
  id: string;
  score: number;
  fishCaughtCount: number;
  timestamp: number;
}

export interface GameStateData {
  currentScore: number;
  fishCaughtThisSession: Fish[];
}