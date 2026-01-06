import { create } from 'zustand';
import type { Cafe } from '@/lib/types/cafe';

interface CafeState {
  cafes: Cafe[];
  loading: boolean;
  error: string | null;
  setCafes: (cafes: Cafe[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateCafe: (cafeId: string, updates: Partial<Cafe>) => void;
}

export const useCafeStore = create<CafeState>((set) => ({
  cafes: [],
  loading: false,
  error: null,
  setCafes: (cafes) => set({ cafes }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  updateCafe: (cafeId, updates) =>
    set((state) => ({
      cafes: state.cafes.map((cafe) =>
        cafe.id === cafeId ? { ...cafe, ...updates } : cafe
      ),
    })),
}));

