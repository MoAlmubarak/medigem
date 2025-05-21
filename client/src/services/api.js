// client/src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export const searchDrug = async (drugName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/medications/${encodeURIComponent(drugName)}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};