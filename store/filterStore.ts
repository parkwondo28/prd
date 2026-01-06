import { create } from 'zustand';
import type { FilterOptions } from '@/lib/types/filter';

interface FilterState {
  isOpen: boolean;
  options: FilterOptions;
  setIsOpen: (isOpen: boolean) => void;
  setOptions: (options: FilterOptions) => void;
  resetFilters: () => void;
}

const defaultOptions: FilterOptions = {};

export const useFilterStore = create<FilterState>((set) => ({
  isOpen: false,
  options: defaultOptions,
  setIsOpen: (isOpen) => set({ isOpen }),
  setOptions: (options) => set({ options }),
  resetFilters: () => set({ options: defaultOptions }),
}));

