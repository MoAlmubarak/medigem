import React from 'react';
import AppRoutes from './routes/Routes';
import { AppProvider } from './context';
import './styles/App.css';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;