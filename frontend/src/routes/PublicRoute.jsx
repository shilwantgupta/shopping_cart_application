import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
const PublicRoute = () => {
  const token = localStorage.getItem('token');
  return <>{!token ? <Outlet /> : <Navigate to='/' />}</>;
};

export default PublicRoute;
