import { ProductWithSubCategoryAndCategory } from '@/types/types';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

export const search = async (query: string = ''): Promise<ProductWithSubCategoryAndCategory[]> => {
  try {
    if (!query.trim()) {
      return [];
    }
    const response = await axiosInstance.get<ProductWithSubCategoryAndCategory[]>(ApiRoutes.SEARCH_PRODUCTS, {
      params: { query },
    });

    if (!response.data || response.data.length === 0) {
      console.warn('No products found for query:', query);
      return [];
    }

    return response.data;
  } catch (error) {
    console.error('An error occurred during the search:', error);
    return [];
  }
};
