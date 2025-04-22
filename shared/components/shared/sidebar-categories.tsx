import { Category } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface Props {
  className?: string;
  categories: Category[];
}

export const SidebarCategories: React.FC<Props> = ({ categories, className }) => {
  if (!categories || categories.length === 0) {
    return <p className="text-gray-500 pl-4">Категорії відсутні.</p>;
  }

  return (
    <nav aria-label="Список категорій">
      <ul className={className}>
        {categories.map((category) => (
          <li
            key={category.id}
            className={`py-1 pl-4 border-b border-primary last:border-b-0 cursor-pointer `}
          >
            <Link href={`/categories/${category.id}`} aria-label={`Перейти до категорії ${category.name}`}>
              <p>{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
