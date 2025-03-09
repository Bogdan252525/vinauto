import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const Banner: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('banner flex flex-col items-center', className)}>
      <p className="text-2xl font-bold text-center mt-[10px] mb-[20px]">
        Якість
        <br /> на яку ви можете розраховувати!
      </p>
      <h1 className="text-8xl font-medium text-primary mb-[260px] italic">
        VINAUTO
      </h1>
    </div>
  );
};
