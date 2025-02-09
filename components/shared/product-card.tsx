import Link from 'next/link';
import React from 'react';
import { ProductWithImages } from '@/app/types/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '../ui';

interface Props {
  className?: string;
  product: ProductWithImages;
}

export const ProductCard: React.FC<Props> = ({ className, product }) => {
  return (
    <li
      className={cn(
        'flex flex-col items-center justify-end w-[308px] h-[400px] border rounded-lg p-4 shadow-md',
        className
      )}
    >
      <Link
				href={`/product/${product.id}`}
			>
          <div className="flex flex-col items-center">
            <div className='max-h-[240px] flex items-center mb-2'>
              <Image
                src={product.images[0].url}
                alt={product.name}
                width={0}
                height={0}
								sizes="100vw"
								priority
            		className="w-auto max-h-[240px]"
              />
            </div>
            <div>
              <h3
								className='multi-line-truncate h-12'>{product.name}
							</h3>
              <p className="text-center text-lg mb-2">{product.price}грн.</p>
            </div>
          </div>
      </Link>
			<Button className="w-full">Купити</Button>
    </li>
  );
};
