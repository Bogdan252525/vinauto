import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui';
import { cn } from '@/lib/utils';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, className }) => {
	return (
		<div className={cn("flex flex-col items-center w-[308px] border rounded-lg p-4", className)}>
			<Link href={`/product/${id}`}>
			<div
				className = "flex flex-col items-center"
			>
				<div>
					<Image
						src={imageUrl}
						alt={name}
						width={300}
						height={400}
					/>
				</div>
				<div>
					<h3>{name}</h3>
					<p
					 className="text-center text-lg"
					>{price}грн.</p>
				</div>
			</div>
			</Link>
			<Button
				className="w-full"
			>
				Купити
			</Button>
		</div>
	);
};