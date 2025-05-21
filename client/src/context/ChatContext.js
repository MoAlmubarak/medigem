import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

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
  pendingMessages: {}, // Track messages waiting for API responses
  messageIds: new Set([1]) // Track message IDs to prevent duplicates
};

// Action types
const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
const CLEAR_MESSAGES = 'CLEAR_MESSAGES';
const ADD_PENDING_MESSAGE = 'ADD_PENDING_MESSAGE';
const RESOLVE_PENDING_MESSAGE = 'RESOLVE_PENDING_MESSAGE';

// Reducer function
const chatReducer = (state, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      // First, check if the message ID already exists to prevent duplicates
      if (state.messageIds.has(action.payload.id)) {
        console.warn('Attempted to add duplicate message with ID:', action.payload.id);
        return state;
      }
      
      // Add the message ID to the set of known IDs
      const updatedIds = new Set(state.messageIds);
      updatedIds.add(action.payload.id);
      
      return {
        ...state,
        messages: [...state.messages, action.payload],
        messageIds: updatedIds
      };
    }
    case UPDATE_MESSAGE:
      return {
        ...state,
        messages: state.messages.map(message => 
          message.id === action.payload.id 
            ? { ...message, ...action.payload.updates } 
            : message
        ),
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: [initialState.messages[0]], // Keep the welcome message
        pendingMessages: {},
        messageIds: new Set([1]) // Reset to just the initial message ID
      };
    case ADD_PENDING_MESSAGE:
      return {
        ...state,
        pendingMessages: {
          ...state.pendingMessages,
          [action.payload.searchId]: action.payload
        }
      };
    case RESOLVE_PENDING_MESSAGE: {
      if (!action.payload.searchId || !state.pendingMessages[action.payload.searchId]) {
        return state;
      }
      
      // Create a new pendingMessages object without the resolved message
      const { [action.payload.searchId]: _, ...remainingPendingMessages } = state.pendingMessages;
      return {
        ...state,
        pendingMessages: remainingPendingMessages
      };
    }
    default:
      return state;
  }
};

// Create context
const ChatContext = createContext();

// Context provider component
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Debug logging for development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Current chat state:', { 
        messageCount: state.messages.length,
        pendingCount: Object.keys(state.pendingMessages).length,
        messageIds: Array.from(state.messageIds)
      });
    }
  }, [state.messages, state.pendingMessages, state.messageIds]);

  // Action to add a message
  const addMessage = useCallback((message) => {
    const id = Date.now();
    const newMessage = {
      id,
      timestamp: new Date(),
      ...message,
    };
    dispatch({ type: ADD_MESSAGE, payload: newMessage });
    return id;
  }, []);

  // Action to update an existing message
  const updateMessage = useCallback((id, updates) => {
    dispatch({ type: UPDATE_MESSAGE, payload: { id, updates } });
  }, []);

  // Action to add a pending message (optimistic update)
  const addPendingMessage = useCallback((searchData) => {
    if (!searchData.searchId) {
      console.warn('Attempted to add pending message without searchId', searchData);
      return;
    }
    dispatch({ type: ADD_PENDING_MESSAGE, payload: searchData });
  }, []);

  // Action to resolve a pending message
  const resolvePendingMessage = useCallback((searchId) => {
    if (!searchId) {
      console.warn('Attempted to resolve pending message without searchId');
      return;
    }
    dispatch({ type: RESOLVE_PENDING_MESSAGE, payload: { searchId } });
  }, []);

  // Action to clear all messages
  const clearMessages = useCallback(() => {
    dispatch({ type: CLEAR_MESSAGES });
  }, []);

  // Context value
  const value = {
    messages: state.messages,
    pendingMessages: state.pendingMessages,
    addMessage,
    updateMessage,
    addPendingMessage,
    resolvePendingMessage,
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