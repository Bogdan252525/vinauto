'use client'

import React from 'react';
import { ProductCard } from './product-card';
import { ProductWithImages } from '@/types/types';

interface Props {
	products: ProductWithImages[];
	className?: string;
}

export const ProductsByCategory: React.FC<Props> = ({ products, className }) => {

	return (
		<ul className={className}>
			{products.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
				/>
			))}
		</ul>
	);
};