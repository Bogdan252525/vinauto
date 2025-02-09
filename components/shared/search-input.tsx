'use client';

import React, { ChangeEvent } from 'react';
import { useSearchStore } from '@/store/search';
import { Input } from '../ui';

export const SearchInput: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearchStore();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
	console.log(searchQuery);
  return (
    <Input
      className="focus-visible:bg-background max-w-80 w-full md:text-base placeholder:text-background"
      type="search"
      placeholder="Пошук"
      value={searchQuery}
      onChange={handleInputChange}
    />
  );
};
