// ProtectedRoute.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  if (!user.email.endsWith('@crescendoforacause.com')) { //remove the ! to see how this works
    return (
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ textAlign: 'center', color: '#333' }}>
            <h2>Access Restricted</h2>
            <p>You need a crescendoforacause.com email address to access tools.</p>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;