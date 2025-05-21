import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Initial state
const initialState = {
  messages: [
    { 
      id: 1, 
      text: "Hi! I'm MediGem. Ask me about any OTC medication's side effects.", 
      sender: 'bot',
      timestamp: new Date() 
    }
  ],
};

// Action types
const ADD_MESSAGE = 'ADD_MESSAGE';
const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

// Reducer function
const chatReducer = (state, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: [initialState.messages[0]], // Keep the welcome message
      };
    default:
      return state;
  }
};

// Create context
const ChatContext = createContext();

// Context provider component
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Action to add a message
  const addMessage = useCallback((message) => {
    const newMessage = {
      id: Date.now(),
      timestamp: new Date(),
      ...message,
    };
    dispatch({ type: ADD_MESSAGE, payload: newMessage });
  }, []);

  // Action to clear all messages
  const clearMessages = useCallback(() => {
    dispatch({ type: CLEAR_MESSAGES });
  }, []);

  // Context value
  const value = {
    messages: state.messages,
    addMessage,
    clearMessages,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};