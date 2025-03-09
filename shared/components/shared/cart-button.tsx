'use client'

import React from 'react';
import { Button } from '../ui';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/shared/store';

interface Props {
	className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
	const { items } = useCartStore();
	
	return (
		<CartDrawer>
			<Button
				variant="link"
				className={cn('text-background text-lg py-0', className)}
			>
				<div className="w-6 h-6 flex items-center [&_svg]:size-6 relative">
					<ShoppingCart />
					{items.length > 0 && (
						<div className=' flex justify-center items-center absolute top-[-11px] right-[-8px] bg-destructive h-[19px] w-[19px] rounded-3xl'
						>
							<span
								className="text-xs font-bold"
							>
								{items.length < 100 ? items.length : 99}
							</span>
						</div>
					)}
				</div>
				Кошик
			</Button>
		</CartDrawer>
	);
};