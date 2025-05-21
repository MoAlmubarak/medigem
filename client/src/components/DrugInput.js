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
        placeholder="Enter medication name (e.g., Ibuprofen)"
        disabled={isLoading}
        className="drug-input"
      />
      <button 
        type="submit" 
        className="submit-button"
        disabled={isLoading || !drugName.trim()}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default DrugInput;