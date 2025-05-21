import React from 'react';
import ChatInterface from './components/ChatInterface';
import './styles/App.css';

function App() {
  // Get API docs URL from environment variable or use default
  const apiDocsUrl = process.env.REACT_APP_API_DOCS_URL || 'http://localhost:3001/api/docs';
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>MediGem</h1>
        <p>Know Your Medicine - OTC Drug Side Effects & Interactions</p>
      </header>
      <main>
        <div className="app-intro">
          <p>Ask about any over-the-counter medication to learn about its side effects, interactions, and usage guidance.</p>
        </div>
        <ChatInterface />
        
        {/* Developer info section */}
        {/* <div className="developer-section">
          <h3>For Developers</h3>
          <p>
            MediGem provides a REST API for accessing medication information.
            Integrate with our API to access the database of medication side effects and interactions.
          </p>
          <a 
            href={apiDocsUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="api-docs-button"
          >
            View API Documentation
          </a>
        </div> */}
      </main>
      <footer>
        <p>Data source: OpenFDA API | <a href={apiDocsUrl} target="_blank" rel="noopener noreferrer">API Docs</a></p>
        <p className="copyright">© {new Date().getFullYear()} MediGem</p>
      </footer>
    </div>
  );
}

export default App;