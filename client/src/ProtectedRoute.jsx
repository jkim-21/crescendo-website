// ProtectedRoute.js
import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/mentor-mentee-matching" />;
  }
  return children;
};

export default ProtectedRoute;

