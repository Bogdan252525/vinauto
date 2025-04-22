'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

type SortOption = 'name_asc' | 'price_asc' | 'price_desc' | 'rating_desc';

interface Props {
  className?: string;
}

const sortOptions = [
  { value: 'name_asc', label: 'за алфавітом' },
  { value: 'price_asc', label: 'за зростанням ціни' },
  { value: 'price_desc', label: 'за зниженням ціни' },
  { value: 'rating_desc', label: 'за популярністю' },
];

export const SelectFilters: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const handleSortChange = (value: SortOption) => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('sortBy', value);
      router.push(url.toString());
    } catch (error) {
      console.error('Failed to update sort parameter:', error);
    }
  };

  return (
    <div className={className}>
      <Select onValueChange={handleSortChange} aria-label="Виберіть параметр сортування">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Сортування:" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

