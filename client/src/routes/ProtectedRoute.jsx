// ProtectedRoute.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div></div>
  }

  else if (!user) {
    return (
      <Navigate to ='/' replace={true}/>
    )
  }

  return children;
};

export default ProtectedRoute;