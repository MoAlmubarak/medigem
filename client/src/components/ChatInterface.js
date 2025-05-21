import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import DrugInput from './DrugInput';
import SideEffectsDisplay from './SideEffectsDisplay';
import { searchDrug } from '../services/api';
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
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDrugSearch = async (drugName) => {
    if (!drugName.trim()) return;

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
      // Handle error
      console.error('Error searching for drug:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: `I couldn't find information about "${drugName}". Please check the spelling or try another medication.`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
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
        {loading && (
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
      <DrugInput onSubmit={handleDrugSearch} isLoading={loading} />
    </div>
  );
};

export default ChatInterface;