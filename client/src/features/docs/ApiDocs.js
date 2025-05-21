import React from 'react';
import '../../styles/components/ApiDocs.css';

const ApiDocs = () => {
  const apiDocsUrl = process.env.REACT_APP_API_DOCS_URL || 'http://localhost:3001/api/docs';
  
  return (
    <div className="api-docs-container">
      <h2>API Documentation</h2>
      <p>
        MediGem provides a REST API for accessing medication information.
        Developers can integrate with our API to access the database of 
        medication side effects and interactions.
      </p>
      <div className="api-links">
        <a 
          href={apiDocsUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="api-docs-link"
        >
          View API Documentation
        </a>
        <a 
          href={`${apiDocsUrl.replace('/docs', '')}/swagger.json`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="api-docs-link"
        >
          Download OpenAPI Specification
        </a>
      </div>
    </div>
  );
};

export default ApiDocs;