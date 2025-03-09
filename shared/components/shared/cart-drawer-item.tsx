import { cn } from '@/shared/lib/utils';
import React from 'react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItem from './cart-item-details';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
	onClickCountButton?: (type: 'plus' | 'minus') => void;
	onClickRemove?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
	disabled,
	onClickCountButton,
	onClickRemove,
  className,
}) => {
  return (
    <div className={cn('flex bg-white p-5 gap-6', {'opacity-50 pointer-events-none': disabled}, className)}>
      <CartItem.Image
				src={imageUrl}
				alt={name}
				width={0}
				height={0}
				sizes='100vh'
				priority={true}
				className='w-auto max-h-[60px]'
			/>

      <div className="flex-1">
        <CartItem.Info
          name={name}
        />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton
						onClick={onClickCountButton}
            value={quantity}
          />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
							onClick={onClickRemove}
              className="text-gray-400 cursor-pointer hover: to-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
