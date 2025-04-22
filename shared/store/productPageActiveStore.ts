import { create } from 'zustand';

interface PageState {
  isProductPageActive: boolean;
  setProductPageActive: (state: boolean) => void;
}

export const usePageStore = create<PageState>((set) => ({
  isProductPageActive: false,
  setProductPageActive: (state: boolean) => set({ isProductPageActive: state }),
}));
