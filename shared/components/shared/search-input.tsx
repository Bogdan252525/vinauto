'use client';

import React, { ChangeEvent } from 'react';
import { useDebounce } from 'react-use';
import { useSearchStore } from '@/shared/store/search';
import { Input } from '../ui';

export const SearchInput: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [debouncedQuery, setDebouncedQuery] = React.useState(searchQuery || '');

  useDebounce(
    () => {
      setSearchQuery(debouncedQuery);
    },
    100,
    [debouncedQuery]
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue !== debouncedQuery) {
      setDebouncedQuery(newValue);
    }
  };

  return (
    <Input
      className="focus-visible:bg-background max-w-80 w-full md:text-base placeholder:text-background"
      type="search"
      placeholder="Пошук"
      value={debouncedQuery}
      onChange={handleInputChange}
    />
  );
};

