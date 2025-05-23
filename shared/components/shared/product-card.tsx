'use client';

import Link from 'next/link';
import React from 'react';
import { ProductWithImages } from '@/types/types';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { Button } from '../ui';
import toast from 'react-hot-toast';
import { useCartStore } from '@/shared/store';
import { ProductAvailability } from './product-availability';
import { ProductPrice } from './product-price';
import { IsSaleMark } from './is-sale-mark';
import { truncateText } from '@/shared/lib';
import { RatingStars } from './rating-stars';

interface Props {
  path?: string;
  className?: string;
  product: ProductWithImages;
}

export const ProductCard: React.FC<Props> = ({ className, product, path }) => {
  const addCartItem = useCartStore((state) => state.addCartItem);

  const onAddProduct = () => {
    try {
      addCartItem({
        productItemId: product.id,
      });
      toast.success(`"${truncateText(product.name, 30)}" додано в корзину.`);
    } catch (error) {
      toast.error('Не вдалось додати товар в корзину');
      console.error(error);
    }
  };

  const imageUrl =
    product.images?.[0]?.url || '/assets/img/photo-placeholder.jpg';

  return (
    <li
      className={cn(
        'flex flex-col items-center justify-end w-[308px] h-[424px] border rounded-lg p-4 shadow-md relative',
        className
      )}
    >
      <Link href={path || '/fallback-url'}>
        <div className="flex flex-col items-center h-[358px]">
          <IsSaleMark isOnSale={product.isOnSale} />
          <div className="max-h-[240px] flex items-center mb-2">
            <Image
              src={imageUrl}
              alt={product.name || 'Невідомий продукт'}
              width={0}
              height={0}
              sizes="100vw"
              priority
              className="w-auto h-[218px]"
            />
          </div>
          <div className="w-[270px]">
            <h3 className="multi-line-truncate h-12 mb-1 text-center">
              {product.name}
            </h3>
            <div className="flex flex-col justify-center items-center">
              <RatingStars rating={product.averageRating} />
              <ProductAvailability availability={product.status} />
              <ProductPrice
                price={product.price}
                discountPrice={product.discountPrice}
                className="flex items-center gap-2 text-lg"
              />
            </div>
          </div>
        </div>
      </Link>
      <Button className="w-full" onClick={onAddProduct}>
        Купити
      </Button>
    </li>
  );
};
