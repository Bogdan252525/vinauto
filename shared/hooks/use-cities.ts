import { useState } from "react";
import { useDebounce } from "react-use";

type City = { Ref: string; Description: string };

export const useCities = (query: string, isActive: boolean) => {
  const [cities, setCities] = useState<City[]>([]);

  useDebounce(() => {
    if (isActive && query && query.length >= 1) {
      fetch('/api/novaposhta', {
        method: 'POST',
        body: JSON.stringify({ type: 'cities', query }),
      })
        .then((res) => res.json())
        .then((data) => setCities(data.data))
        .catch(console.error);
    } else {
      setCities([]);
    }
  }, 250, [query, isActive]);

  return cities;
};
