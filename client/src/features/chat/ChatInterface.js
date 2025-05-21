// client/src/features/chat/ChatInterface.js
import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import DrugInput from './DrugInput';
import SideEffectsDisplay from '../../features/medication/SideEffectsDisplay';
import { useChat } from '../../context/ChatContext';
import { useMedicationSearch } from '../../hooks/useMedicationSearch';
import '../../styles/components/ChatInterface.css';

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
              <SideEffectsDisplay sideEffects={message.sideEffects} />
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