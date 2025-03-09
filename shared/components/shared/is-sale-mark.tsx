import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
	className?: string;
	isOnSale?: boolean;
}

export const IsSaleMark: React.FC<Props> = ({ isOnSale, className }) => {
	return (
		<>
			{isOnSale && (
        <div className={cn("absolute top-[-1px] right-[-1px]", className)}>
          <div className="rounded-tr-md bg-green-500 text-white font-bold text-sm px-6 py-1 transform origin-top-right">
            Знижка
          </div>
        </div>
      )}
		</>
	);
};