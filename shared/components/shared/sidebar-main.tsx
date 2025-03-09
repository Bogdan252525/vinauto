'use client';

import { cn } from '@/shared/lib/utils';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import React, { useEffect } from 'react';
import { Api } from '@/shared/services/api-client';
import { useCategoryStore } from '@/shared/store/categoryStore';
import { ProductsByCategory } from './products-by-category';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const SidebarMain: React.FC<Props> = ({ className, children }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const categories = useCategoryStore((state) => state.categories);
  const setCategories = useCategoryStore((state) => state.setCategories);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  );
  const products = useCategoryStore((state) => state.products);
  const setProducts = useCategoryStore((state) => state.setProducts);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await Api.categories.fetchCategories();
      setCategories(categoriesData);
    };

    fetchCategories();
  }, [setCategories]);

  const handleCategoryClick = async (categoryId: number) => {
    setSelectedCategory(categoryId);
    const productsData = await Api.productsByCategory.fetchProductsByCategory(
      categoryId
    );
    setProducts(productsData);
  };

  return (
    <div className={cn('relative', className)}>
      <div
        className={`absolute top-0 transition-all duration-300 transform ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        } min-h-screen h-full w-64 bg-accent text-foreground border-2 border-primary rounded-md rounded-tr-none`}
      >
        <h3 className="text-lg font-medium text-center mt-4 mb-0 border-b border-primary pb-2">
          Категорії
        </h3>
        <ul className="py-4 pt-0">
          {categories.map((category) => (
            <li
              key={category.id}
              className={`py-1 pl-4 border-b border-primary last:border-b-0 cursor-pointer ${
                category.id === selectedCategory ? 'text-primary bg-white' : ''
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <p>{category.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div
          className={`transition-all duration-300 ${
            isOpen ? 'ml-64' : 'ml-0'
          } flex-1`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute bg-accent p-0.5 border-2 border-primary border-l-0 rounded-r-md"
          >
            {isOpen ? (
              <PanelLeftClose
                className="text-primary"
                size={22}
              />
            ) : (
              <PanelLeftOpen
                className="text-primary"
                size={22}
              />
            )}
          </button>
          {selectedCategory && (
            <div>
              <h2 className="pt-10 mb-3 ml-4">Продукти в категорії:</h2>

							<ProductsByCategory
								products={products}
								className='flex flex-wrap gap-4 mx-4 w-full'
							/>

            </div>
          )}
          {products.length <= 0 && <div>{children}</div>}
        </div>
      </div>
    </div>
  );
};
