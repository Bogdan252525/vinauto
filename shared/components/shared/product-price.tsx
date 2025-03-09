import React from 'react';

interface Props {
	price: number;
  discountPrice?: number | null;
	className?: string;
}

export const ProductPrice: React.FC<Props> = ({ price, discountPrice, className }) => {

	const hasDiscount = discountPrice && discountPrice > 0;

	return (
		<div className={className}>
			{hasDiscount ? (
        <>
					<span className="text-gray-500 line-through text-sm">{price} грн</span>
          <span className="text-red-500 font-semibold">{discountPrice} грн</span>
        </>
      ) : (
        <span className="text-black font-semibold">{price} грн</span>
      )}
		</div>
	);
};