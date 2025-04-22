import React from 'react';

interface Props {
  price: number;
  discountPrice?: number | null;
  className?: string;
}

export const ProductPrices: React.FC<Props> = ({
  price,
  discountPrice,
  className,
}) => {
  const hasDiscount = typeof discountPrice === 'number' && discountPrice > 0;

  return (
    <div className={className}>
      {hasDiscount ? (
        <div className='flex justify-center'>
          <span className='mt-1 mr-2 text-lg'>ціна:</span>
          <div className='flex flex-col'>
            <span
              aria-label="Стара ціна"
              className="text-gray-500 line-through text-xl leading-none"
            >
              {price} грн
            </span>
            <span
              aria-label="Ціна зі знижкою"
              className="text-red-500 font-semibold text-xl leading-none"
            >
              {discountPrice} грн
            </span>
          </div>
        </div>
      ) : (
        <div className='flex justify-center'>
          <span className='mr-2 text-lg'>ціна:</span>
          <span
            aria-label="Звичайна ціна"
            className="text-black font-semibold text-xl"
          >
            {price} грн
          </span>
        </div>
      )}
    </div>
  );
};
