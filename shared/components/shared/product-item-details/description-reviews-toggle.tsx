import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  isDescription: boolean;
  setIsDescription: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export const DescriptionReviewsToggle: React.FC<Props> = ({
  isDescription,
  setIsDescription,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <span
        onClick={() => setIsDescription(true)}
        className={`ml-10 text-lg cursor-pointer underline-offset-8 ${
          isDescription ? 'underline' : ''
        }`}
      >
        Опис
      </span>
      <span
        onClick={() => setIsDescription(false)}
        className={`ml-10 text-lg cursor-pointer underline-offset-8 ${
          isDescription ? '' : 'underline'
        }`}
      >
        Відгуки
      </span>
    </div>
  );
};
