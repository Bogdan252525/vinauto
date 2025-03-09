'use client';

import React from 'react';
import { Api } from '@/shared/services/api-client';
import { ProductWithImages } from '@/types/types';
import { useSearchStore } from '@/shared/store/search';
import { Container } from './container';
import { cn } from '@/shared/lib/utils';
import { useDebounce } from 'react-use';
import Link from 'next/link';
import Image from 'next/image';
import { ProductPrice } from './product-price';

interface Props {
  className?: string;
}

export const SearchResultsOverlay: React.FC<Props> = ({ className }) => {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [products, setProducts] = React.useState<ProductWithImages[]>([]);

  useDebounce(
    () => {
      Api.products.search(searchQuery).then((items) => {
        setProducts(items);
      });
    },
    250,
    [searchQuery]
  );

  const handleInputClean = () => {
    setSearchQuery('');
    setProducts([]);
  };

  if (!searchQuery) return null;

  return (
    <div
      className={cn(
        'absolute left-0 top-[68px] z-20 w-full py-5 bg-border',
        className
      )}
    >
      <Container>
        <h2>Результати пошуку для {searchQuery}</h2>
        <ul className="flex gap-2 flex-wrap">
          {products.map((product) => (
            <li
              key={product.id}
              onClick={handleInputClean}
            >
              <Link
                href={`/product/${product.id}`}
                className="w-[206px] h-[250px] border rounded-md flex flex-col items-center justify-center gap-2 flex-shrink-0 px-1 bg-background shadow"
              >
                <div className="h-[110px] flex items-center mb-1">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority
                    className="w-auto h-[110px]"
                  />
                </div>
                <div className="text-center">
                  <h3 className="multi-line-truncate mb-1 h-[50px]">{product.name}</h3>
									<ProductPrice
										price={product.price}
										discountPrice={product.discountPrice}
										className='flex justify-center items-center gap-1'
									/>                
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};
