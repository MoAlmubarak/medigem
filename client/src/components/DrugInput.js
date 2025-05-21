import React, { useState } from 'react';

const DrugInput = ({ onSubmit, isLoading }) => {
  const [drugName, setDrugName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (drugName.trim() && !isLoading) {
      onSubmit(drugName);
      setDrugName('');
    }
  };
  
  return (
    <form className="drug-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={drugName}
        onChange={(e) => setDrugName(e.target.value)}
        placeholder="Enter medication name (e.g., Ibuprofen, Tylenol)"
        disabled={isLoading}
        className="drug-input"
        aria-label="Enter medication name"
      />
      <button 
        type="submit" 
        className="submit-button"
        disabled={isLoading || !drugName.trim()}
        aria-label="Search medication"
      >
        {isLoading ? (
          <>
            <span className="loading-spinner"></span>
            Searching...
          </>
        ) : (
          <>
            <span className="search-icon">🔍</span>
            Search
          </>
        )}
      </button>
    </form>
  );
};

export default DrugInput;