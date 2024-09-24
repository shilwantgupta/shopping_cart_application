import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Admin/Sidebar';
const AdminRoute = () => {
  const token = localStorage.getItem('token');
  const { user } = useContext(AuthContext);
  if (!token) return <Navigate to='/login' />;

  return (
    <>
      {user.isAdmin ? (
        <Sidebar>
          <Outlet />
        </Sidebar>
      ) : (
        <Navigate to='/unauthorized' />
      )}
    </>
  );
};

export default AdminRoute;
