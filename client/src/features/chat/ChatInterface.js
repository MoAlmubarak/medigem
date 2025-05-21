// client/src/features/chat/ChatInterface.js
import React, { useRef, useEffect, Suspense, lazy } from 'react';
import MessageBubble from './MessageBubble';
import DrugInput from '../chat/DrugInput';
import { useChat } from '../../context/ChatContext';
import { useMedicationSearch } from '../../hooks/useMedicationSearch';
import '../../styles/components/ChatInterface.css';

// Lazy load the components
const SideEffectsDisplay = lazy(() => import('../../features/medication/SideEffectsDisplay'));
const SideEffectsSkeleton = lazy(() => import('../../features/medication/SideEffectsSkeleton'));
const ErrorMessageDisplay = lazy(() => import('../../features/medication/ErrorMessageDisplay'));

// Simple loading component for Suspense fallback
const LoadingDisplay = () => (
  <div className="loading-message-container">
    <div className="loading-spinner"></div>
    <p className="loading-text">Loading medication information...</p>
  </div>
);

const ChatInterface = () => {
  const { messages } = useChat();
  const { handleSearch, isSearching } = useMedicationSearch();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Extract drug name from search message
  const extractDrugName = (text) => {
    const match = text.match(/Searching for information about (.+)\.\.\./);
    return match?.[1] || text.match(/information about "(.+)"/)?.[1] || "medication";
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} className="message-wrapper">
            <MessageBubble message={message} />
            
            {/* Show skeleton loader while searching */}
            {message.isLoading && message.sender === 'bot' && message.text.includes('Searching') && (
              <Suspense fallback={<LoadingDisplay />}>
                <SideEffectsSkeleton 
                  drugName={extractDrugName(message.text)} 
                />
              </Suspense>
            )}
            
            {/* Show error display if there's an error */}
            {message.error && message.sender === 'bot' && (
              <Suspense fallback={<LoadingDisplay />}>
                <ErrorMessageDisplay 
                  drugName={extractDrugName(message.text)} 
                  errorMessage={message.error}
                />
              </Suspense>
            )}
            
            {/* Show side effects if data loaded successfully */}
            {message.sideEffects && !message.isLoading && !message.error && (
              <Suspense fallback={<LoadingDisplay />}>
                <SideEffectsDisplay sideEffects={message.sideEffects} />
              </Suspense>
            )}
          </div>
        ))}
        
        {/* Show visual indicator while typing/searching */}
        {isSearching && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      <DrugInput onSubmit={handleSearch} isLoading={isSearching} />
    </div>
  );
};

export default ChatInterface;