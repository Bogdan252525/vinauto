'use client';

import React from 'react';
import { Api } from '@/shared/services/api-client';
import { ProductWithSubCategoryAndCategory } from '@/types/types';
import { useSearchStore } from '@/shared/store/search';
import { Container } from './container';
import { cn } from '@/shared/lib/utils';
import { useDebounce } from 'react-use';
import { ProductCardMini } from './product-card-mini';

interface Props {
  className?: string;
  debounceTime?: number;
}

export const SearchResultsOverlay: React.FC<Props> = ({
  className,
  debounceTime = 250,
}) => {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [products, setProducts] = React.useState<ProductWithSubCategoryAndCategory[]>([]);

  useDebounce(
    () => {
      if (!searchQuery) return;

      const fetchProducts = async () => {
        try {
          const items = await Api.products.search(searchQuery);
          setProducts(items);
        } catch (error) {
          console.error('Failed to fetch search results:', error);
          setProducts([]);
        }
      };

      fetchProducts();
    },
    debounceTime,
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
        <h2 className="sr-only">Результати пошуку</h2>
        <h2>Результати пошуку для: {searchQuery}</h2>
        <ul className="flex mt-2 gap-2 flex-wrap">
          {products.length > 0 ? (
            products.map((product) => {

              return (
                <ProductCardMini
                  key={product.id}
                  product={product}
                  path={`/categories/${product.subCategory.category.id}/subcategories/${product.subCategoryId}/products/${product.id}`}
                  handleInputClean={handleInputClean}
                />
              );
            })
            
          ) : (
            <p className="text-red-500 text-center mt-2">Завантаження ...</p>
          )}
        </ul>
      </Container>
    </div>
  );
};
