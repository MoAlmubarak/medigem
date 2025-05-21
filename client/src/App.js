import React from 'react';
import ChatInterface from './components/ChatInterface';
import './styles/App.css';

function App() {
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
      </main>
      <footer>
        <p>Data source: OpenFDA API | Disclaimer: For educational purposes only</p>
        <p className="copyright">© {new Date().getFullYear()} MediGem</p>
      </footer>
    </div>
  );
}

export default App;