import React, { useEffect, useState } from 'react';
import api from '../services/interceptor';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get('/cart')
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          setCart(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const addToCart = (product, quantity) => {
    api
      .post('/cart/add', { productId: product, quantity })
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;
          setCart(data);
          toast.success('Item added to cart');
        }
      })
      .catch((err) => toast.error('Error adding item to cart'));
  };
  const updateQuantity = (product, quantity) => {
    api
      .post('/cart/update', { productId: product, quantity })
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          setCart(data);
        }
      })
      .catch((err) => toast.error('Error adding item to cart'));
  };

  const removeFromCart = (productId) => {
    api
      .post('/cart/remove', { productId })
      .then((res) => {
        if (res.status === 200) {
          const filtered = cart?.items.filter(
            (item) => item.product._id !== productId
          );
          console.log(filtered);
          setCart({ ...cart, items: filtered });
        }
      })
      .catch((err) => toast.error('Error removing item to cart'));
  };

  const onCheckout = () => {
    api
      .post('/cart/checkout', {
        shippingAddress: {
          street: 'Cabin road',
          city: 'Mumbai',
          state: 'Maharashtra',
          zip: '401105',
        },
        paymentMethod: 'test',
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Checkout successfully!');
          const { data } = res.data;
          setCart(data);
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, onCheckout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
