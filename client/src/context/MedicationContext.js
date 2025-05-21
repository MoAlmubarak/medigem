import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { searchDrug } from '../services/api';

// Initial state
const initialState = {
  isLoading: false,
  error: null,
  currentMedication: null,
  searchHistory: [],
  pendingSearches: {}, // Track ongoing searches
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
        pendingSearches: {
          ...state.pendingSearches,
          [action.payload.searchId]: {
            drugName: action.payload.drugName,
            timestamp: new Date()
          }
        },
        error: null,
      };
    case SEARCH_SUCCESS:
      // Create a new pendingSearches object without the completed search
      const { [action.payload.searchId]: _, ...remainingSearches } = state.pendingSearches;
      
      return {
        ...state,
        isLoading: Object.keys(remainingSearches).length > 0, // Still loading if other searches pending
        pendingSearches: remainingSearches,
        currentMedication: action.payload.data,
        error: null,
      };
    case SEARCH_ERROR:
      // Remove the failed search from pending
      const { [action.payload.searchId]: __, ...remainingAfterError } = state.pendingSearches;
      
      return {
        ...state,
        isLoading: Object.keys(remainingAfterError).length > 0,
        pendingSearches: remainingAfterError,
        error: action.payload.error,
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

  // Generate a unique search ID
  const generateSearchId = () => `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Action to search for a medication with optimistic updates
  const searchMedication = useCallback(async (drugName) => {
    const searchId = generateSearchId();
    
    // Optimistically update the UI
    dispatch({ 
      type: SEARCH_START, 
      payload: { 
        searchId,
        drugName 
      } 
    });
    
    try {
      const medicationData = await searchDrug(drugName);
      dispatch({ 
        type: SEARCH_SUCCESS, 
        payload: { 
          searchId,
          data: medicationData 
        } 
      });
      
      dispatch({ 
        type: ADD_TO_HISTORY, 
        payload: { 
          drugName,
          brandName: medicationData.drugInfo.brandName,
          genericName: medicationData.drugInfo.genericName,
          timestamp: new Date()
        }
      });
      
      return {
        searchId,
        data: medicationData,
        status: 'success'
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to search for medication';
      dispatch({ 
        type: SEARCH_ERROR, 
        payload: {
          searchId,
          error: errorMessage
        } 
      });
      
      return {
        searchId,
        error: errorMessage,
        status: 'error'
      };
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