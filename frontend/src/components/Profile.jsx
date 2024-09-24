import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Profile;
