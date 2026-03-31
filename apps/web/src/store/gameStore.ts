import { create } from 'zustand';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { Fish, GameState } from '@/types/game';
import { FISH_TYPES } from '@/data/fishData';
import { useCollectionStore } from '@/store/collectionStore';
import { useHighScoresStore } from '@/store/highScoresStore';

export interface ExtendedGameState extends GameState {
  fetchGame: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useGameStore = create<ExtendedGameState>()((set, get) => ({
  currentScore: 0,
  fishCaughtThisSession: [],
  isFishing: false,
  activeFish: null,
  showGameOverDialog: false,
  isLoading: false,
  error: null,

  fetchGame: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.get<{ data: { currentScore: number, fishCaughtThisSession: Fish[] } }>('/game');
      set({
        currentScore: data.currentScore,
        fishCaughtThisSession: data.fishCaughtThisSession,
        isLoading: false
      });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  startGame: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.post<{ data: { currentScore: number, fishCaughtThisSession: Fish[] } }>('/game/start', {});
      set({
        currentScore: data.currentScore,
        fishCaughtThisSession: data.fishCaughtThisSession,
        isFishing: false,
        activeFish: null,
        showGameOverDialog: false,
        isLoading: false
      });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  castLine: () => {
    const { isFishing } = get();
    if (isFishing) return;

    set({ isFishing: true, activeFish: null });
    
    setTimeout(() => {
      // 70% chance to hook a fish
      const biteChance = Math.random();
      if (biteChance > 0.3) {
        // Determine rarity based on probabilities
        const rarityRoll = Math.random();
        let targetRarity = 'common';
        if (rarityRoll > 0.95) targetRarity = 'legendary';
        else if (rarityRoll > 0.8) targetRarity = 'rare';
        else if (rarityRoll > 0.5) targetRarity = 'uncommon';

        // Safe fallback in case FISH_TYPES is not properly loaded
        const fishTypes = Array.isArray(FISH_TYPES) && FISH_TYPES.length > 0 
          ? FISH_TYPES 
          : [{ 
              id: 'fallback-fish', 
              name: 'Standard Fish', 
              points: 10, 
              rarity: 'common' as const, 
              imageUrl: 'https://placehold.co/100x100/ADD8E6/000000?text=Fish'
            }];

        const availableFish = fishTypes.filter(f => f.rarity === targetRarity);
        const fallbackFish = fishTypes.filter(f => f.rarity === 'common');
        
        const pool = availableFish.length > 0 ? availableFish : (fallbackFish.length > 0 ? fallbackFish : fishTypes);
        const caughtFish = pool[Math.floor(Math.random() * pool.length)];

        set({ activeFish: caughtFish });
        toast.success(`You hooked a ${caughtFish.name}! Reel it in!`);
      } else {
        set({ isFishing: false, activeFish: null });
        toast.info('Nothing bit this time... Try again!');
      }
    }, 2000);
  },

  reelIn: async () => {
    const { activeFish } = get();
    if (activeFish) {
      try {
        set({ isLoading: true });
        
        // Save catch to backend game session
        const { data } = await api.post<{ data: { currentScore: number, fishCaughtThisSession: Fish[] } }>('/game/catch', { fish: activeFish });
        
        // Also add to collection API
        await useCollectionStore.getState().addCaughtFish(activeFish);
        
        set({
          fishCaughtThisSession: data.fishCaughtThisSession,
          currentScore: data.currentScore,
          activeFish: null,
          isFishing: false,
          isLoading: false
        });
        toast.success(`Successfully caught ${activeFish.name}! +${activeFish.points} pts`);
      } catch (err: any) {
        set({ error: err.message, isLoading: false, isFishing: false, activeFish: null });
        toast.error('Failed to reel in fish.');
      }
    }
  },

  endGame: () => set({ showGameOverDialog: true }),

  confirmEndGame: async () => {
    const { currentScore, fishCaughtThisSession } = get();
    
    if (currentScore > 0 || fishCaughtThisSession.length > 0) {
      // Save high score to backend
      await useHighScoresStore.getState().addSession(currentScore, fishCaughtThisSession.length);
    }
    
    // Reset game session via API
    try {
      set({ isLoading: true });
      const { data } = await api.post<{ data: { currentScore: number, fishCaughtThisSession: Fish[] } }>('/game/start', {});
      set({
        currentScore: data.currentScore,
        fishCaughtThisSession: data.fishCaughtThisSession,
        isFishing: false,
        activeFish: null,
        showGameOverDialog: false,
        isLoading: false
      });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  cancelEndGame: () => set({ showGameOverDialog: false })
}));