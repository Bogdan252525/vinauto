import { cn } from '@/shared/lib/utils';
import { SubCategory } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  className?: string;
  subCategory: SubCategory;
}

export const SubCategoryCard: React.FC<Props> = ({
  subCategory,
  className,
}) => {

  return (   
    <li
      className={cn(
        'flex flex-col items-center justify-end w-[308px] h-[320px] border rounded-lg p-4 shadow-md relative',
        className
      )}
    >
      <Link href={`${subCategory.categoryId}/subcategories/${subCategory.id}`}>
        <div className="max-h-[240px] flex items-center mb-2">
          <Image
            src={subCategory.image || '/assets/img/photo-placeholder.jpg'}
            alt={subCategory.name || 'Невідома підкатегорія'}
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="w-auto h-[218px]"
          />
        </div>
        <div className="multi-line-truncate w-[240px] h-[46px] text-center">
          {subCategory.name}
        </div>
      </Link>
    </li>   
  );
};
