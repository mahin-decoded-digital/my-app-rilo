import { create } from 'zustand';
import { api } from '@/lib/api';
import type { HighScoresState, PlayerSession } from '../types/game';

// Extend HighScoresState to include a fetch function
export interface ExtendedHighScoresState extends HighScoresState {
  fetchHighScores: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useHighScoresStore = create<ExtendedHighScoresState>()((set) => ({
  highScores: [],
  isLoading: false,
  error: null,
  
  fetchHighScores: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.get<{ data: PlayerSession[] }>('/highscores');
      set({ highScores: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  addSession: async (score: number, fishCaughtCount: number) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.post<{ data: PlayerSession[] }>('/highscores', { score, fishCaughtCount });
      set({ highScores: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));