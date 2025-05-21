// client/src/features/medication/SideEffectsSkeleton.js
import React from 'react';
import '../../styles/components/SideEffectsDisplay.css';
import '../../styles/components/Skeleton.css';

const SideEffectsSkeleton = ({ drugName }) => {
  return (
    <div className="side-effects-container skeleton-container">
      <div className="drug-header">
        <div className="drug-title">
          <h3>{drugName || 'Loading...'}</h3>
          <span className="generic-name skeleton-text">Loading information...</span>
        </div>
        <div className="update-info skeleton-pulse">Searching...</div>
      </div>
      
      <div className="tabs">
        {['Common Side Effects', 'Serious Side Effects', 'Interactions', 'When to Consult'].map((tab, index) => (
          <button 
            key={index}
            className={`tab ${index === 0 ? 'active' : ''}`}
            disabled
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        <h4>Searching for information...</h4>
        <div className="skeleton-list">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="skeleton-item skeleton-pulse"></div>
          ))}
        </div>
      </div>
      
      <div className="disclaimer">
        <p><strong>Note:</strong> Fetching information from medical database. Complete data will appear shortly...</p>
      </div>
    </div>
  );
};

export default SideEffectsSkeleton;