import { ProductWithImages } from '@/app/types/types'
import { axiosInstance } from './instance'
import { ApiRoutes } from './constants'

export const search = async (query: string): Promise<ProductWithImages[]> => {
	return (await axiosInstance.get<ProductWithImages[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query }})).data
}