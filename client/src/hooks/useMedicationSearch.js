import { useState, useCallback } from 'react';
import { useMedication } from '../context/MedicationContext';
import { useChat } from '../context/ChatContext';

export const useMedicationSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const { searchMedication } = useMedication();
  const { addMessage } = useChat();

  const handleSearch = useCallback(async (drugName) => {
    if (!drugName.trim() || isSearching) return;

    setIsSearching(true);
    
    // Add user message
    addMessage({
      text: drugName,
      sender: 'user',
    });
    
    try {
      // Search for medication
      const medicationData = await searchMedication(drugName);
      
      // Add bot response
      addMessage({
        text: `Here's information about ${medicationData.drugInfo.brandName || drugName}:`,
        sender: 'bot',
        sideEffects: medicationData // Include full data for display
      });
      
      return medicationData;
    } catch (error) {
      console.error('Error searching for drug:', error);
      
      // Add error message
      addMessage({
        text: `I couldn't find information about "${drugName}". Please check the spelling or try another medication.`,
        sender: 'bot'
      });
      
      return null;
    } finally {
      setIsSearching(false);
    }
  }, [addMessage, searchMedication, isSearching]);

  return {
    handleSearch,
    isSearching
  };
};