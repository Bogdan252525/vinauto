import { create } from 'zustand';
import { ProductWithImages } from '@/types/types';
import { Category } from '@prisma/client';

interface CategoryState {
  selectedCategory: number | null;
  setSelectedCategory: (categoryId: number | null) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  products: ProductWithImages[];
  setProducts: (products: ProductWithImages[]) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
  categories: [],
  setCategories: (categories) => set({ categories }),
  products: [],
  setProducts: (products) => set({ products }),
}));
