// client/src/features/medication/ErrorMessageDisplay.js
import React from 'react';
import '../../styles/components/ErrorMessageDisplay.css';

const ErrorMessageDisplay = ({ drugName, errorMessage }) => {
  return (
    <div className="error-message-container">
      <div className="error-icon">
        <span role="img" aria-label="error">⚠️</span>
      </div>
      <div className="error-content">
        <h4>Unable to find information for "{drugName}"</h4>
        <p>{errorMessage || 'There was an error retrieving medication information. Please try again or check your spelling.'}</p>
        <div className="error-suggestions">
          <p>You might want to try:</p>
          <ul>
            <li>Checking the spelling of the medication name</li>
            <li>Using the brand name instead of generic name (or vice versa)</li>
            <li>Searching for a similar medication</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessageDisplay;