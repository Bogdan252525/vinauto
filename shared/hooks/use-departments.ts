import { useState } from 'react';
import { useDebounce } from 'react-use';

type Department = { Ref: string; Description: string };

export const useDepartments = (city: string, query: string, isActive: boolean) => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useDebounce(() => {
    if (city && isActive) {
      fetch('/api/novaposhta', {
        method: 'POST',
        body: JSON.stringify({ type: 'departments', city, query }),
      })
        .then((res) => res.json())
        .then((data) => setDepartments(data.data))
        .catch(console.error);
    } else {
      setDepartments([]);
    }
  }, 250, [city, query, isActive]);

  return departments;
};
