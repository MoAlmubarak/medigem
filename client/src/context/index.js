import React from 'react';
import { MedicationProvider } from './MedicationContext';
import { ChatProvider } from './ChatContext';

// Combine all providers into a single provider
export const AppProvider = ({ children }) => {
  return (
    <MedicationProvider>
      <ChatProvider>
        {children}
      </ChatProvider>
    </MedicationProvider>
  );
};