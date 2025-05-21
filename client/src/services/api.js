// In api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/v1';

export const searchDrug = async (drugName, abortSignal) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/medications/${encodeURIComponent(drugName)}`,
      { signal: abortSignal }
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
      return null;
    }
    console.error('API Error:', error);
    throw error;
  }
};

// Usage in component
const searchWithCancellation = () => {
  const abortController = new AbortController();
  const { signal } = abortController;
  
  // Cancel any previous request
  if (currentAbortController) {
    currentAbortController.abort();
  }
  
  setCurrentAbortController(abortController);
  searchDrug(drugName, signal)
    .then(/* Handle response */)
    .catch(/* Handle error */);
};