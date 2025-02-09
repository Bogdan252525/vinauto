import { Category, Product } from '@prisma/client';

export interface ProductWithImages extends Product {
  images: { url: string; isPrimary: boolean }[];
}

export interface CategoryWithProducts extends Category {
  products: ProductWithImages[];
}