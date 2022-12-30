import { useCallback, useState } from 'react';

const STORAGE_KEY = 'searchQuery';

export const useQueryStorage = () => {
  const [query, _setQuery] = useState<string[]>(() => {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  });

  const setQuery = useCallback((key: string) => {
    _setQuery((query) => {
      if (key && !query.includes(key)) {
        const newQuery = [...query, key];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newQuery));
        return newQuery;
      }
      return query;
    });
  }, []);

  const clearQuery = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    _setQuery([]);
  }, []);

  return { query, setQuery, clearQuery };
};
