import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import AuthProvider from './context/AuthContext.jsx';
import CartProvider from './context/CartContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
