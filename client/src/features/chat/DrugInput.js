// client/src/features/chat/DrugInput.js
import React, { useState, useRef, useEffect } from 'react';
import { useMedication } from '../../context/MedicationContext';

const DrugInput = ({ onSubmit, isLoading }) => {
  const [drugName, setDrugName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { searchHistory } = useMedication();
  const inputRef = useRef(null);
  
  // Automatically focus the input when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (drugName.trim() && !isLoading) {
      onSubmit(drugName);
      setDrugName(''); // Clear input immediately for better UX
    }
  };
  
  const handleKeyDown = (e) => {
    // Allow submission with enter key
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };
  
  return (
    <form 
      className={`drug-input-container ${isFocused ? 'focused' : ''}`} 
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        value={drugName}
        onChange={(e) => setDrugName(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder="Enter medication name (e.g., Ibuprofen, Tylenol)"
        disabled={isLoading}
        className="drug-input"
        aria-label="Enter medication name"
        list="medication-history"
        autoComplete="off"
      />
      
      {/* Datalist for search history suggestions */}
      {searchHistory.length > 0 && (
        <datalist id="medication-history">
          {searchHistory.map((item, index) => (
            <option key={index} value={item.drugName} />
          ))}
        </datalist>
      )}
      
      <button 
        type="submit" 
        className={`submit-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading || !drugName.trim()}
        aria-label="Search medication"
      >
        {isLoading ? (
          <>
            <span className="loading-spinner"></span>
            <span>Searching...</span>
          </>
        ) : (
          <>
            <span className="search-icon">🔍</span>
            <span>Search</span>
          </>
        )}
      </button>
    </form>
  );
};

export default DrugInput;