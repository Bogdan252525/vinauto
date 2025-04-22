import React from 'react';
import { SubCategoryCard } from './sub-category-card';
import { SubCategory } from '@prisma/client';

interface Props {
  subCategories: SubCategory[];
  title?: string;
}

export const SubCategories: React.FC<Props> = ({
  subCategories,
  title = 'Підкатегорії в категорії:',
}) => {
  if (!subCategories || subCategories.length === 0) {
    return (
      <>
        <h2 className="pt-10 mb-3 ml-4">{title}</h2>
        <p className="text-center text-gray-500">Немає підкатегорій для цієї категорії.</p>
      </>
    );
  }

  return (
    <>
      <h2
        id="sub-category-title"
        className="pt-10 mb-3 ml-4"
      >
        {title}
      </h2>
      <ul
        className="flex flex-wrap gap-4 mx-4 my-6"
        aria-labelledby="sub-category-title"
      >
        {subCategories.map((subCategory) => (
          <SubCategoryCard
            key={subCategory.id}
            subCategory={subCategory}
          />
        ))}
      </ul>
    </>
  );
};
