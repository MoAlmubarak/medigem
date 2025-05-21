// In the custom hook
import { useState, useEffect } from 'react';

export const useSearchHistory = (maxItems = 10) => {
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('medigem-search-history');
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    localStorage.setItem('medigem-search-history', JSON.stringify(searchHistory));
  }, [searchHistory]);
  
  const addToHistory = (drugName) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== drugName.toLowerCase());
      return [drugName, ...filtered].slice(0, maxItems);
    });
  };
  
  const clearHistory = () => setSearchHistory([]);
  
  return { searchHistory, addToHistory, clearHistory };
};