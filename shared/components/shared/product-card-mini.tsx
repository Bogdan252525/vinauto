import { ProductWithSubCategoryAndCategory } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RatingStars } from './rating-stars';
import { ProductPrice } from './product-price';

interface Props {
  product: ProductWithSubCategoryAndCategory;
  path: string;
  handleInputClean?: () => void;
  className?: string;
}

export const ProductCardMini: React.FC<Props> = ({ product, handleInputClean, className }) => {
  return (
    <li className={className} onClick={handleInputClean}>
      <Link
        href={`/categories/${product.subCategory.category.id}/subcategories/${product.subCategoryId}/products/${product.id}`}
        className="w-[206px] h-[250px] border rounded-md flex flex-col items-center justify-center gap-2 flex-shrink-0 px-1 bg-background shadow"
      >
        <div className="h-[110px] flex items-center mb-1">
          <Image
            src={product.images?.[0]?.url ||
              '/assets/img/photo-placeholder.jpg'}
            alt={product.name || 'Невідомий продукт'}
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="w-auto h-[110px]"
          />
        </div>
        <RatingStars rating={product.averageRating} />
        <div className="text-center">
          <h3 className="multi-line-truncate mb-1 h-[50px]">{product.name}</h3>
          <ProductPrice
            price={product.price}
            discountPrice={product.discountPrice}
            className="flex justify-center items-center gap-1"
          />
        </div>
      </Link>
    </li>
  );
};
