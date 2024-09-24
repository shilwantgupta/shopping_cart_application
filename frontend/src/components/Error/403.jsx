import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './error.module.css';

const Forbidden = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>403</h1>
      <p className={styles.subtitle}>Oops! You do not have permission to access this page.</p>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleBackToHome}
        className={styles.button}
      >
        Go Back Home
      </Button>
    </div>
  );
};

export default Forbidden;
