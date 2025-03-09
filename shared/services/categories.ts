import { Category } from '@prisma/client';
import { axiosInstance } from './instance'
import { ApiRoutes } from './constants'

export const fetchCategories = async (): Promise<Category[]> => {
  return (await axiosInstance.get<Category[]>(ApiRoutes.PRODUCTS_CATEGORIES)).data
}
