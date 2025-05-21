// client/src/features/chat/ChatInterface.js
import React, { useRef, useEffect, Suspense, lazy } from 'react';
import MessageBubble from './MessageBubble';
import DrugInput from './DrugInput';
import { useChat } from '../../context/ChatContext';
import { useMedicationSearch } from '../../hooks/useMedicationSearch';
import '../../styles/components/ChatInterface.css';

// Lazy load the SideEffectsDisplay component
const SideEffectsDisplay = lazy(() => import('../../features/medication/SideEffectsDisplay'));

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

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id}>
            <MessageBubble message={message} />
            {message.sideEffects && (
              <Suspense fallback={<LoadingDisplay />}>
                <SideEffectsDisplay sideEffects={message.sideEffects} />
              </Suspense>
            )}
          </div>
        ))}
        {isSearching && (
          <MessageBubble 
            message={{ 
              id: 'loading', 
              text: 'Searching...', 
              sender: 'bot'
            }} 
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      <DrugInput onSubmit={handleSearch} isLoading={isSearching} />
    </div>
  );
};

export default ChatInterface;