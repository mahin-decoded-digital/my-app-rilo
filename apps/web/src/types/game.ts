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

export interface GameState {
  currentScore: number;
  fishCaughtThisSession: Fish[];
  isFishing: boolean;
  activeFish: Fish | null;
  showGameOverDialog: boolean;
  
  startGame: () => Promise<void> | void;
  castLine: () => void;
  reelIn: () => Promise<void> | void;
  endGame: () => void;
  confirmEndGame: () => Promise<void> | void;
  cancelEndGame: () => void;
}

export interface CollectionState {
  caughtFishCollection: Record<string, CaughtFish>;
  addCaughtFish: (fish: Fish) => Promise<void> | void;
}

export interface HighScoresState {
  highScores: PlayerSession[];
  addSession: (score: number, fishCaughtCount: number) => Promise<void> | void;
}