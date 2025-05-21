// client/src/components/SearchHistory.js
import React from 'react';
import '../styles/components/SearchHistory.css';

const SearchHistory = ({ history, onSelectItem, onClearHistory }) => {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className="search-history">
      <div className="search-history-header">
        <h3>Recent Searches</h3>
        <button className="clear-history-btn" onClick={onClearHistory}>
          Clear
        </button>
      </div>
      <ul className="history-list">
        {history.map((item, index) => (
          <li key={index} className="history-item">
            <button onClick={() => onSelectItem(item)}>{item}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;