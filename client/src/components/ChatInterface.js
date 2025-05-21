// client/src/components/ChatInterface.js
import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import DrugInput from './DrugInput';
import SearchHistory from './SearchHistory';
import SideEffectsDisplay from './SideEffectsDisplay';
import LoadingIndicator from './LoadingIndicator'; // Import new component
import ErrorMessage from './ErrorMessage'; // Import new component
import { searchDrug } from '../services/api';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { getErrorMessage, getSuggestions } from '../utils/errorHandler'; // Import error utilities
import '../styles/components/ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi! I'm MediGem. Ask me about any OTC medication's side effects.", 
      sender: 'bot',
      timestamp: new Date() 
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  
  // Use the custom hook
  const { searchHistory, addToHistory, clearHistory } = useSearchHistory();

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDrugSearch = async (drugName) => {
    if (!drugName.trim()) return;

    // Reset error state
    setError(null);

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: drugName,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Show loading state
    setLoading(true);
    
    try {
      // Call API to get drug information
      const response = await searchDrug(drugName);
      
      // Add to search history
      addToHistory(drugName);
      
      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: `Here's information about ${response.drugInfo.brandName || drugName}:`,
        sender: 'bot',
        timestamp: new Date(),
        sideEffects: response // Include full data for display
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Handle error with improved error handling
      console.error('Error searching for drug:', error);
      setError(error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: getErrorMessage(error),
        sender: 'bot',
        timestamp: new Date(),
        isError: true // Flag to identify error messages
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    // If suggestion is in the form "Try searching for X instead"
    // Extract the medication name
    const match = suggestion.match(/try (?:searching for |the generic name |)['"]?([^'"]+)['"]?(?:\s+instead)?/i);
    if (match && match[1]) {
      handleDrugSearch(match[1]);
    } else if (suggestion.includes('Ibuprofen') || suggestion.includes('Tylenol')) {
      // Handle common medication suggestions
      const med = suggestion.includes('Ibuprofen') ? 'Ibuprofen' : 'Tylenol';
      handleDrugSearch(med);
    }
  };

  return (
    <div className="chat-container">
      {/* Add search history component */}
      <SearchHistory 
        history={searchHistory} 
        onSelectItem={handleDrugSearch}
        onClearHistory={clearHistory}
      />
      
      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id}>
            <MessageBubble message={message} />
            {message.sideEffects && (
              <SideEffectsDisplay sideEffects={message.sideEffects} />
            )}
            {message.isError && (
              <ErrorMessage 
                error={message.text}
                suggestions={getSuggestions(error)}
                onSuggestionClick={handleSuggestionClick}
              />
            )}
          </div>
        ))}
        {loading && (
          <LoadingIndicator text="Searching our medication database..." />
        )}
        <div ref={messagesEndRef} />
      </div>
      <DrugInput onSubmit={handleDrugSearch} isLoading={loading} />
    </div>
  );
};

export default ChatInterface;