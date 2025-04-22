// import { create } from 'zustand';

// type Filters = {
//   manufacturers: string[];
//   countries: string[];
//   brands: string[];
//   carModels: string[];
// };

// type FiltersStore = {
//   filters: Filters | null;
//   setFilters: (filters: Filters) => void;
// };

// export const useFiltersStore = create<FiltersStore>((set) => ({
//   filters: null,
//   setFilters: (filters) => set({ filters }),
// }));


import { create } from 'zustand';

type Filters = {
  manufacturers: string[];
  countries: string[];
  brands: string[];
  carModels: string[];
};

type FiltersStore = {
  filters: Filters | null;
  setFilters: (filters: Filters) => void;
  sortBy: string | null;
  setSortBy: (sortBy: string) => void;
};

export const useFiltersStore = create<FiltersStore>((set) => ({
  filters: null,
  setFilters: (filters) => set({ filters }),
  sortBy: null,
  setSortBy: (sortBy) => set({ sortBy }),
}));
