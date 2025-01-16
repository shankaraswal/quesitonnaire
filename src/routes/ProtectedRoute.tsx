import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // TODO: replace with actual authentication logic
  const isAuthenticated = Boolean(localStorage.getItem('isLoggedin'));
  return isAuthenticated == true ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};
export default ProtectedRoute;
