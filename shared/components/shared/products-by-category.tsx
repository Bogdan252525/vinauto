'use client';

import React from 'react';
import { ProductCard } from './product-card';
import { ProductWithImages } from '@/types/types';
import { fetchFilters } from '@/shared/lib/fetch-filters';
import { usePageStore } from '@/shared/store/productPageActiveStore';
import { SelectFilters } from './select-filters';
import { PaginationComponent } from './pagination-conponent';

interface Props {
  products: ProductWithImages[];
  currentPage: number;
  totalPages: number;
}

const loadFilters = async (subCategoryId: string) => {
  try {
    await fetchFilters(subCategoryId);
    console.log(`Filters loaded for subcategory ID: ${subCategoryId}`);
  } catch (error) {
    console.error(`Failed to fetch filters for subcategory ID ${subCategoryId}`, error);
  }
};

export const ProductsByCategory: React.FC<Props> = ({
  products,
  currentPage,
  totalPages,
}) => {
  const setProductPageActive = usePageStore((state) => state.setProductPageActive);

  React.useEffect(() => {
    setProductPageActive(true);

    return () => {
      setProductPageActive(false);
    };
  }, [setProductPageActive]);

  React.useEffect(() => {
    if (!products || products.length === 0) {
      console.warn('No products found, skipping filter fetch.');
      return;
    }

    loadFilters(products[0].subCategoryId.toString());
  }, [products]);

  if (!currentPage || currentPage < 1 || !totalPages || totalPages < 1) {
    return <p>Некоректні дані для пагінації.</p>;
  }

  return (
    <>
      <main className="min-h-[calc(100vh-50px)]">
        <div className="flex justify-between">
          <h2 className="pt-10 mb-3 ml-4">Товари в підкатегорії:</h2>
          <SelectFilters className="mt-8 mr-4" />
        </div>

        <ul className="flex flex-wrap gap-4 mx-4 my-6 mb-auto">
          {products.map((product) => (
            <ProductCard
              path={`${product.subCategoryId}/products/${product.id}`}
              key={product.id}
              product={product} />
          ))}
        </ul>
      </main>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        className="my-4"
      />
    </>
  );
};
