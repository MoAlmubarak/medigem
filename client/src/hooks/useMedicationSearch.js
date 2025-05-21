import { useState, useCallback, useRef } from 'react';
import { useMedication } from '../context/MedicationContext';
import { useChat } from '../context/ChatContext';

export const useMedicationSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const { searchMedication, pendingSearches } = useMedication();
  const { addMessage, updateMessage, resolvePendingMessage } = useChat();
  
  // Use a reference to track the latest search to prevent duplicate responses
  const lastSearchRef = useRef(null);

  const handleSearch = useCallback(async (drugName) => {
    if (!drugName.trim() || isSearching) return;
    
    // Check if this is a duplicate of the last search
    if (lastSearchRef.current === drugName.trim()) {
      console.log('Preventing duplicate search for:', drugName);
      return;
    }
    
    // Update the last search reference
    lastSearchRef.current = drugName.trim();
    setIsSearching(true);
    
    // Add user message immediately
    const userMessageId = addMessage({
      text: drugName,
      sender: 'user',
    });
    
    // Add bot response with loading state immediately (optimistic update)
    const botMessageId = addMessage({
      text: `Here's information about ${drugName}:`,
      sender: 'bot',
      isLoading: true,
    });

    try {
      // Start the actual API request
      const result = await searchMedication(drugName);
      
      if (result.status === 'success') {
        // Update the bot message with actual data
        updateMessage(botMessageId, {
          text: `Here's information about ${result.data.drugInfo.brandName || drugName}:`,
          isLoading: false,
          sideEffects: result.data
        });
        
        // Resolve the pending message
        if (result.searchId) {
          resolvePendingMessage(result.searchId);
        }
        
        return result.data;
      } else {
        // Update with error message
        updateMessage(botMessageId, {
          text: `I couldn't find information about "${drugName}". Please check the spelling or try another medication.`,
          isLoading: false,
          error: result.error
        });
        
        // Resolve the pending message
        if (result.searchId) {
          resolvePendingMessage(result.searchId);
        }
        
        return null;
      }
    } catch (error) {
      console.error('Error searching for drug:', error);
      
      // Update with error message
      updateMessage(botMessageId, {
        text: `I'm sorry, there was an error while searching for "${drugName}". Please try again later.`,
        isLoading: false,
        error: error.message
      });
      
      return null;
    } finally {
      setIsSearching(false);
      
      // After a delay, clear the last search reference to allow repeat searches
      setTimeout(() => {
        if (lastSearchRef.current === drugName.trim()) {
          lastSearchRef.current = null;
        }
      }, 1000); // 1 second delay
    }
  }, [addMessage, updateMessage, searchMedication, isSearching, resolvePendingMessage]);

  return {
    handleSearch,
    isSearching,
    hasPendingSearches: Object.keys(pendingSearches || {}).length > 0
  };
};