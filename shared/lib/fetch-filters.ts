import { Api } from "../services/api-client";
import { useFiltersStore } from "../store/filtersStore";

let lastFetchedId: string | null = null;

export const fetchFilters = async (id: string) => {
  if (id === lastFetchedId) {
    return null;
  }

  try {
    const filters = await Api.search.search(id);
    lastFetchedId = id;

    const setFilters = useFiltersStore.getState().setFilters
    setFilters(filters)
    return filters;
  } catch (error) {
    console.error('Failed to fetch filters:', error);
    throw error;
  }
};
