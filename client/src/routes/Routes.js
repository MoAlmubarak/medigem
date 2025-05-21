// client/src/routes/Routes.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner'; // Create this component

// Lazy load components
const ChatInterface = lazy(() => import('../features/chat/ChatInterface'));
const ApiDocs = lazy(() => import('../features/docs/ApiDocs'));

// You can add more routes as your app grows
const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<ChatInterface />} />
            <Route path="/api-docs" element={<ApiDocs />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default AppRoutes;