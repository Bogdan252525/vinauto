'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useFiltersStore } from '@/shared/store/filtersStore';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { Api } from '@/shared/services/api-client';
import { usePageStore } from '@/shared/store/productPageActiveStore';

export const SidebarFilters: React.FC = () => {
  const isProductPageActive = usePageStore((state) => state.isProductPageActive);
  const { filters } = useFiltersStore();
  const [carModels, setCarModels] = React.useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();

  const updateUrlParams = (key: string, value: string) => {
    const url = new URL(window.location.href);
    const currentValue = url.searchParams.get(key);

    if (currentValue === value) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }

    return url.pathname + url.search;
  };

  const handleFilterClick = (filterKey: string, filterValue: string) => {
    const updatedUrl = updateUrlParams(filterKey, filterValue);
    router.push(updatedUrl);
  };

  const handleModelClick = async (brand: string) => {
    try {
      handleFilterClick('brand', brand);

      const url = new URL(window.location.href);
      const currentFilterValue = url.searchParams.get('brand');

      if (currentFilterValue !== brand) {
        const subCategoryId = params.subcategoryId as string;
        const models = await Api.carModels.fetchCarModels(subCategoryId, brand);
        setCarModels(models);
      }
    } catch (error) {
      console.error('Помилка під час отримання моделей авто:', error);
    }
  };

  if (!isProductPageActive) return null;

  if (!filters) {
    return <p className="text-center text-gray-500">Фільтри не завантажені.</p>;
  }
  
  return (
    <aside className="px-2">
      <h3 className="text-center text-lg mt-3 mb-1">Фільтри</h3>
      {filters?.countries && (
        <div>
          <h4>Країни</h4>
          <ul className="flex gap-1 flex-wrap mb-2 overflow-x-auto whitespace-nowrap max-h-[135px]">
            {filters.countries.map((country) => {
              const isActive = searchParams.get('country') === country;
              return (
                <li key={country}>
                  <button
                    onClick={() => handleFilterClick('country', country)}
                    className={cn(
                      'p-1 border border-primary rounded cursor-pointer text-sm',
                      isActive && 'bg-blue-500 text-white'
                    )}
                  >
                    {country}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {filters?.manufacturers && (
        <div>
          <h4>Виробники</h4>
          <ul className="flex gap-1 flex-wrap mb-2 overflow-x-auto whitespace-nowrap max-h-[135px]">
            {filters.manufacturers.map((manufacturer) => {
              const isActive =
                searchParams.get('manufacturer') === manufacturer; //
              return (
                <li key={manufacturer}>
                  <button
                    onClick={() =>
                      handleFilterClick('manufacturer', manufacturer)
                    }
                    className={cn(
                      'p-1 border border-primary rounded cursor-pointer text-sm',
                      isActive && 'bg-primary text-white'
                    )}
                  >
                    {manufacturer}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {filters?.brands && (
        <div>
          <h4>Бренди</h4>
          <ul className="flex gap-1 flex-wrap mb-2 overflow-x-auto whitespace-nowrap max-h-[135px]">
            {filters.brands.map((brand) => {
              const isActive = searchParams.get('brand') === brand;
              return (
                <li key={brand}>
                  <button
                    onClick={() => handleModelClick(brand)}
                    className={cn(
                      'p-1 border border-primary rounded cursor-pointer text-sm',
                      isActive && 'bg-blue-500 text-white'
                    )}
                  >
                    {brand}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {searchParams.get('brand') && (
        <div>
          <h4>Моделі авто</h4>
          <ul className="flex gap-1 flex-wrap overflow-x-auto whitespace-nowrap max-h-[135px]">
            {carModels.map((carModel) => {
              const isActive = searchParams.get('carModel') === carModel;
              return (
                <li key={carModel}>
                  <button
                    onClick={() => handleFilterClick('carModel', carModel)}
                    className={cn(
                      'p-1 border border-primary rounded cursor-pointer text-sm',
                      isActive && 'bg-blue-500 text-white'
                    )}
                  >
                    {carModel}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </aside>
  );
};
