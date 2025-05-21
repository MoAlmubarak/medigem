import React, { useState } from 'react';
import MedicationTabs from './MedicationTabs';
import MedicationDetails from './MedicationDetails';
import '../../styles/components/SideEffectsDisplay.css';

const SideEffectsDisplay = ({ sideEffects }) => {
  const [activeTab, setActiveTab] = useState('common');
  
  const { drugInfo, sideEffects: effectsData, guidance } = sideEffects;
  
  const formatDate = (dateString) => {
    if (!dateString || dateString === 'Unknown') return null;
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return null;
    }
  };
  
  // Handler for tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
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
            Updated: {formatDate(drugInfo.lastUpdated)}
          </div>
        )}
      </div>
      
      <MedicationTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={[
          { id: 'common', label: 'Common Side Effects' },
          { id: 'serious', label: 'Serious Side Effects' },
          { id: 'interactions', label: 'Interactions' },
          { id: 'guidance', label: 'When to Consult' },
        ]}
      />
      
      <div className="tab-content" role="tabpanel">
        {activeTab === 'common' && (
          <MedicationDetails
            title="Common Side Effects"
            items={effectsData.common}
            emptyMessage="No common side effects information available"
          />
        )}
        
        {activeTab === 'serious' && (
          <div className="serious-effects">
            <h4>Serious Side Effects</h4>
            <p className="warning-text">
              <strong>Warning:</strong> Contact a healthcare provider immediately if you experience any of these effects.
            </p>
            <MedicationDetails
              items={effectsData.serious}
              emptyMessage="No serious side effects information available"
              className="serious-list"
            />
          </div>
        )}
        
        {activeTab === 'interactions' && (
          <MedicationDetails
            title="Drug Interactions"
            items={effectsData.interactions}
            emptyMessage="No drug interactions information available"
            className="interactions-list"
          />
        )}
        
        {activeTab === 'guidance' && (
          <div className="guidance">
            <h4>When to Consult a Healthcare Provider</h4>
            <div className="guidance-content">
              <p>{guidance.whenToConsult || 'Consult with a healthcare provider before use if you have any concerns.'}</p>
            </div>
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