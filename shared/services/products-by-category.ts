import { ProductWithImages } from '@/types/types';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

export const fetchProductsByCategory = async (
  categoryId: number
): Promise<ProductWithImages[]> => {
  return (
    await axiosInstance.get<ProductWithImages[]>(
      ApiRoutes.PRODUCTS_BY_CATEGORY,
      { params: { categoryId } }
    )
  ).data;
};
