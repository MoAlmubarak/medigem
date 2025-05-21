// client/src/components/LoadingIndicator.js
import React from 'react';
import '../styles/components/LoadingIndicator.css';

const LoadingIndicator = ({ text = 'Searching...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-animation">
        <div className="pill pill-1"></div>
        <div className="pill pill-2"></div>
        <div className="pill pill-3"></div>
      </div>
      <p className="loading-text">{text}</p>
    </div>
  );
};

export default LoadingIndicator;