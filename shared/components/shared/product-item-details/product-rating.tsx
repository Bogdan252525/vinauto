import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  averageRating?: number;
  className?: string;
}

export const ProductRating: React.FC<Props> = ({ averageRating, className }) => {
  return (
    <div className={cn('flex', className)}>
      <span className='mr-2 text-lg'>Рейтинг:</span>
      {averageRating === 0 ? (
        <span className='text-lg italic'>немає оцінок</span>
      ) : (
        <span className='font-semibold text-lg mt-[1px]'>{averageRating}/5</span>
      )}
    </div>
  );
};
