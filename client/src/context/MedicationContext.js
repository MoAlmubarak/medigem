import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { searchDrug } from '../services/api';

// Initial state
const initialState = {
  isLoading: false,
  error: null,
  currentMedication: null,
  searchHistory: [],
};

// Action types
const SEARCH_START = 'SEARCH_START';
const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
const SEARCH_ERROR = 'SEARCH_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';
const ADD_TO_HISTORY = 'ADD_TO_HISTORY';
const CLEAR_HISTORY = 'CLEAR_HISTORY';

// Reducer function
const medicationReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentMedication: action.payload,
        error: null,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case ADD_TO_HISTORY:
      // Avoid duplicates in history
      if (state.searchHistory.some(item => item.drugName === action.payload.drugName)) {
        return state;
      }
      return {
        ...state,
        searchHistory: [action.payload, ...state.searchHistory].slice(0, 10), // Keep only last 10
      };
    case CLEAR_HISTORY:
      return {
        ...state,
        searchHistory: [],
      };
    default:
      return state;
  }
};

// Create context
const MedicationContext = createContext();

// Context provider component
export const MedicationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(medicationReducer, initialState);

  // Load search history from localStorage
  React.useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('medicationSearchHistory');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        parsedHistory.forEach(item => {
          dispatch({ type: ADD_TO_HISTORY, payload: item });
        });
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  }, []);

  // Save search history to localStorage when it changes
  React.useEffect(() => {
    try {
      localStorage.setItem('medicationSearchHistory', JSON.stringify(state.searchHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }, [state.searchHistory]);

  // Action to search for a medication
  const searchMedication = useCallback(async (drugName) => {
    dispatch({ type: SEARCH_START });
    
    try {
      const medicationData = await searchDrug(drugName);
      dispatch({ type: SEARCH_SUCCESS, payload: medicationData });
      dispatch({ type: ADD_TO_HISTORY, payload: { 
        drugName,
        brandName: medicationData.drugInfo.brandName,
        genericName: medicationData.drugInfo.genericName,
        timestamp: new Date()
      }});
      return medicationData;
    } catch (error) {
      dispatch({ 
        type: SEARCH_ERROR, 
        payload: error.response?.data?.message || 'Failed to search for medication'
      });
      throw error;
    }
  }, []);

  // Action to clear the error
  const clearError = useCallback(() => {
    dispatch({ type: CLEAR_ERROR });
  }, []);

  // Action to clear search history
  const clearHistory = useCallback(() => {
    dispatch({ type: CLEAR_HISTORY });
  }, []);

  // Context value
  const value = {
    ...state,
    searchMedication,
    clearError,
    clearHistory,
  };

  return (
    <MedicationContext.Provider value={value}>
      {children}
    </MedicationContext.Provider>
  );
};

// Custom hook to use the medication context
export const useMedication = () => {
  const context = useContext(MedicationContext);
  if (context === undefined) {
    throw new Error('useMedication must be used within a MedicationProvider');
  }
  return context;
};