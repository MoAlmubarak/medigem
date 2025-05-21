import React from 'react';
import Layout from './components/layout/Layout';
import ChatInterface from './features/chat/ChatInterface';
import ApiDocs from './features/docs/ApiDocs';
import { AppProvider } from './context';
import './styles/App.css';

function App() {
  return (
    <AppProvider>
      <Layout>
        <div className="app-intro">
          <p>Ask about any over-the-counter medication to learn about its side effects, interactions, and usage guidance.</p>
        </div>
        <ChatInterface />
        {/* <ApiDocs /> */}
      </Layout>
    </AppProvider>
  );
}

export default App;