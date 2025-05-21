import React from 'react';
import ChatInterface from './components/ChatInterface';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MediGem</h1>
        <p>Know Your Medicine - OTC Drug Side Effects</p>
      </header>
      <main>
        <ChatInterface />
      </main>
      <footer>
        <p>Data source: OpenFDA API | MediGem MVP v1.0</p>
      </footer>
    </div>
  );
}

export default App;