// Create custom hooks for API calls in hooks/useDrugSearch.js
import { useState } from 'react';
import { searchDrug } from '../services/api';

export const useDrugSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drugData, setDrugData] = useState(null);
  
  const searchForDrug = async (drugName) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchDrug(drugName);
      setDrugData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch drug information');
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  return { loading, error, drugData, searchForDrug };
};