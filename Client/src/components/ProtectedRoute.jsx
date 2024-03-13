import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({login}) => {
  const token = localStorage.getItem("token");

  try {
    if (token && login) {
      return <Outlet />;
    }
  } catch (error) {
    if (!token) {
      return <Navigate to="/" />;
    }
  }
  return <Navigate to="/" />;
}

export default ProtectedRoute;


