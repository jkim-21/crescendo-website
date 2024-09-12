// ProtectedRoute.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { RestrictedPage } from '../pages';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.email.endsWith('@crescendoforacause.com')) {
    return (
      <RestrictedPage/> 
    );
  }

  return children;
};

export default ProtectedRoute;