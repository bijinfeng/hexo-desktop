import { useCallback, useState } from 'react';

const useSearchStorage = (storageKey: string, maxCount = 5) => {
  const [query, _setQuery] = useState<string[]>(() => {
    const item = localStorage.getItem(storageKey);
    return item ? JSON.parse(item) : [];
  });

  const setQuery = useCallback((key: string) => {
    _setQuery((query) => {
      if (key && !query.includes(key)) {
        const newQuery = [...query, key];
        if (newQuery.length > maxCount) newQuery.shift();
        localStorage.setItem(storageKey, JSON.stringify(newQuery));
        return newQuery;
      }
      return query;
    });
  }, []);

  const clearQuery = useCallback(() => {
    localStorage.removeItem(storageKey);
    _setQuery([]);
  }, []);

  const deleteQuery = useCallback((key: string) => {
    _setQuery((query) => {
      const newQuery = query.filter((it) => it !== key);
      localStorage.setItem(storageKey, JSON.stringify(newQuery));
      return newQuery;
    });
  }, []);

  return { query, setQuery, deleteQuery, clearQuery };
};

export default useSearchStorage;
