import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { ProductWithSubCategoryAndCategory } from '@/types/types';
import axios from 'axios';

export const related = async (subCategoryId: number, carModelIds?: number[]): Promise<ProductWithSubCategoryAndCategory[]> => {
  try {
    const params: { subCategoryId: number; carModelIds?: string } = { subCategoryId }; // Correct type for subCategoryId

    if (carModelIds && carModelIds.length > 0) {
      params.carModelIds = carModelIds.join(','); // Convert number array to a comma-separated string
    }

    const response = await axiosInstance.get<ProductWithSubCategoryAndCategory[]>(ApiRoutes.RELATED_PRODUCTS, { params });

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
