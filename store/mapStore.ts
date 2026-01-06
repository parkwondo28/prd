import { create } from 'zustand';

interface MapState {
  center: { lat: number; lng: number } | null;
  zoom: number;
  selectedCafeId: string | null;
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
  setSelectedCafe: (cafeId: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  center: null,
  zoom: 15,
  selectedCafeId: null,
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  setSelectedCafe: (cafeId) => set({ selectedCafeId: cafeId }),
}));

