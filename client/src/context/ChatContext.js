// Create context for chat in context/ChatContext.js
import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm MediGem. Ask me about any OTC medication's side effects.", sender: 'bot', timestamp: new Date() }
  ]);
  
  const addMessage = (message) => {
    setMessages(prev => [...prev, { ...message, id: Date.now(), timestamp: new Date() }]);
  };
  
  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);