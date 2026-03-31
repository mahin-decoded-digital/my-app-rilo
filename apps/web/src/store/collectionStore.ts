import { create } from 'zustand';
import { api } from '@/lib/api';
import type { Fish, CollectionState, CaughtFish } from '@/types/game';

// Extend CollectionState to include fetch
export interface ExtendedCollectionState extends CollectionState {
  fetchCollection: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useCollectionStore = create<ExtendedCollectionState>()((set) => ({
  caughtFishCollection: {},
  isLoading: false,
  error: null,

  fetchCollection: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.get<{ data: Record<string, CaughtFish> }>('/collection');
      set({ caughtFishCollection: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  addCaughtFish: async (fish: Fish) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.post<{ data: Record<string, CaughtFish> }>('/collection', { fish });
      set({ caughtFishCollection: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));