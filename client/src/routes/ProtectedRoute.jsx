// ProtectedRoute.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/tools/mentor-mentee-matching-system" />;
  }
  return children;
};

export default ProtectedRoute;