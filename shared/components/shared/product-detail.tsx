'use client';

import React from 'react';
import * as ProductItem from './product-item-details';
import { allProductInformation } from '@/types/types';
import { Button } from '../ui';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';
import { truncateText } from '@/shared/lib';

interface Props {
  product: allProductInformation;
  className?: string;
}

export const ProductDetail: React.FC<Props> = ({ product, className }) => {
  const [isDescription, setIsDescription] = React.useState<boolean>(true);
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

  return (
    <div className={className}>
      <div className="flex justify-between">
        <ProductItem.Photo
          images={product.images}
          className="border rounded-lg shadow-md p-10 max-w-[500px]"
        />

        <div className="ml-4 mt-10 w-1/2">
          <h1 className="text-center text-2xl mb-8 font-semibold">
            {product.name}
          </h1>
          <ProductItem.Rating averageRating={product.averageRating} />

          <div className="flex justify-between mt-10">
            <Button
              onClick={onAddProduct}
              className="w-2/6 mb-10"
            >
              Купити
            </Button>

            <ProductItem.Price
              price={product.price}
              discountPrice={product.discountPrice}
            />
          </div>

          <ProductItem.Information
            className="flex flex-col gap-4"
            countryOfOrigin={product.countryOfOrigin}
            manufacturer={product.manufacturer}
            status={product.status}
            stock={product.stock}
          />
        </div>
      </div>

      <ProductItem.Toggle
        className="border-t-2 mt-10 mb-8 pt-12"
        isDescription={isDescription}
        setIsDescription={setIsDescription}
      />

      {isDescription ? (
        <p className="ml-4 indent-8">{product.description}</p>
      ) : (
        <ProductItem.Reviews reviews={product.reviews} />
      )}
      <div>
        <p className='font-semibold mt-8 ml-4'>Cхожі товари:</p>
        <ProductItem.Related
          className="flex gap-2 ml-4 mr-2 overflow-x-auto my-8"
          product={product}
        />
      </div>
    </div>
  );
};
