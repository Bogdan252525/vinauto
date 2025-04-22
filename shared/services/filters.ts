import { Filters } from '@/types/types';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import axios from 'axios';

export const search = async (subCategoryId: string): Promise<Filters> => {
  if (!subCategoryId.trim()) {
    throw new Error('Subcategory ID is required and cannot be empty');
  }

  try {
    const response = await axiosInstance.get<Filters>(ApiRoutes.PRODUCT_FILTERS, {
      params: { subCategoryId },
    });

    if (!response.data) {
      throw new Error('No data returned from API');
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
