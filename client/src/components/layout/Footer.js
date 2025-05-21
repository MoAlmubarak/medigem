// client/src/components/layout/Footer.js
import React from 'react';

const Footer = () => {
  const apiDocsUrl = process.env.REACT_APP_API_DOCS_URL || 'http://localhost:3001/api/docs';
  
  return (
    <footer>
      <p>Data source: OpenFDA API | <a href={apiDocsUrl} target="_blank" rel="noopener noreferrer">API Docs</a></p>
      <p className="copyright">© {new Date().getFullYear()} MediGem</p>
    </footer>
  );
};

export default Footer;