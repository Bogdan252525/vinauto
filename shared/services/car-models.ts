import axios from 'axios';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

export const fetchCarModels = async (subCategoryId: string, brand: string): Promise<string[]> => {
  try {
    console.log('hui', subCategoryId, brand);
    const response = await axiosInstance.get<string[]>(ApiRoutes.PRODUCT_CAR_MODELS, {
      params: { subCategoryId, brand },
    });

    if (!Array.isArray(response.data)) {
      throw new Error('Invalid response format');
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
