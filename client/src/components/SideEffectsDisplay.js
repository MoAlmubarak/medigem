import React, { useState } from 'react';
import '../styles/components/SideEffectsDisplay.css';

const SideEffectsDisplay = ({ sideEffects }) => {
  const [activeTab, setActiveTab] = useState('common');
  
  const { drugInfo, sideEffects: effectsData, guidance } = sideEffects;
  
  const renderSideEffectsList = (effects) => {
    if (!effects || effects.length === 0) {
      return <p className="no-data">No information available</p>;
    }
    
    return (
      <ul className="side-effects-list">
        {effects.map((effect, index) => (
          <li key={index} className="side-effect-item">{effect}</li>
        ))}
      </ul>
    );
  };
  
  return (
    <div className="side-effects-container">
      <div className="drug-header">
        <div className="drug-title">
          <h3>{drugInfo.brandName || 'Medication'}</h3>
          {drugInfo.genericName && drugInfo.genericName !== drugInfo.brandName && (
            <span className="generic-name">({drugInfo.genericName})</span>
          )}
        </div>
        {drugInfo.lastUpdated && drugInfo.lastUpdated !== 'Unknown' && (
          <div className="update-info">
            Last updated: {new Date(drugInfo.lastUpdated).toLocaleDateString()}
          </div>
        )}
      </div>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'common' ? 'active' : ''}`}
          onClick={() => setActiveTab('common')}
        >
          Common Side Effects
        </button>
        <button 
          className={`tab ${activeTab === 'serious' ? 'active' : ''}`}
          onClick={() => setActiveTab('serious')}
        >
          Serious Side Effects
        </button>
        <button 
          className={`tab ${activeTab === 'interactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('interactions')}
        >
          Interactions
        </button>
        <button 
          className={`tab ${activeTab === 'guidance' ? 'active' : ''}`}
          onClick={() => setActiveTab('guidance')}
        >
          When to Consult
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'common' && (
          <div className="common-effects">
            <h4>Common Side Effects</h4>
            {renderSideEffectsList(effectsData.common)}
          </div>
        )}
        
        {activeTab === 'serious' && (
          <div className="serious-effects">
            <h4>Serious Side Effects</h4>
            <p className="warning-text">
              Contact a healthcare provider immediately if you experience any of these effects:
            </p>
            {renderSideEffectsList(effectsData.serious)}
          </div>
        )}
        
        {activeTab === 'interactions' && (
          <div className="interactions">
            <h4>Drug Interactions</h4>
            {renderSideEffectsList(effectsData.interactions)}
          </div>
        )}
        
        {activeTab === 'guidance' && (
          <div className="guidance">
            <h4>When to Consult a Healthcare Provider</h4>
            <p>{guidance.whenToConsult || 'Consult with a healthcare provider before use if you have any concerns.'}</p>
          </div>
        )}
      </div>
      
      <div className="disclaimer">
        <p>
          <strong>Disclaimer:</strong> This information is for educational purposes only and is not a substitute for medical advice. 
          Always consult a healthcare professional before taking any medication.
        </p>
      </div>
    </div>
  );
};

export default SideEffectsDisplay;