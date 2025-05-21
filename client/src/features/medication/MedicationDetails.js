import React from 'react';

const MedicationDetails = ({ title, items, emptyMessage, className = '' }) => {
  return (
    <div className={className}>
      {title && <h4>{title}</h4>}
      
      {(!items || items.length === 0) ? (
        <p className="no-data">{emptyMessage}</p>
      ) : (
        <ul className={`side-effects-list ${className}`}>
          {items.map((item, index) => (
            <li key={index} className="side-effect-item">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicationDetails;