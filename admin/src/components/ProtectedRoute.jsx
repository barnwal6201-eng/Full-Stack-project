import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const {isLoggedIn} = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
  return <Navigate to="/login" replace state={{ from: location }} />;
}

  return (
    <Outlet />
  )
}

export default ProtectedRoute
