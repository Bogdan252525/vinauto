import { Product, Image, Brand, CarModel } from '@prisma/client';

export interface ProductWithImages extends Product {
  images: { url: string; isPrimary: boolean }[];
  brands?: { name: string }[];
  carModels?: { name: string; id: number }[];
}

export interface ProductWithSubCategoryAndCategory extends ProductWithImages {
  subCategory: {
    id: number;
    name: string;
    category: {
      id: number;
    };
  };
}


export interface Filters {
  manufacturers: string[];
  countries: string[];
  brands: string[];
  carModels: string[];
}

export interface UserForReview {
  firstName: string;
  lastName: string;
}

export interface ReviewForProductPage {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  productId: number;
  userId: number;
  rating: number;
  comment: string | null;
  user: UserForReview | null;
}

export interface allProductInformation extends Product {
  images: Image[];
  brands: Brand[];
  carModels: CarModel[];
  reviews: ReviewForProductPage[];
}
