import React from 'react';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const ProductsGroup: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn("flex flex-wrap gap-4 m-4", className)}>
			{arr.map((item) => (
				<ProductCard
					key={item}
					id={item}
					name={`Product bla bla bla bla bla bla ${item}`}
					price={item * 100}
					imageUrl='/assets/img/item-photo.webp'
				/>				
			))}
		</div>
	);
};