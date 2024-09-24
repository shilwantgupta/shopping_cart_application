// Cart.js
import React from 'react';
import { Button } from 'react-bootstrap'; // or MUI's Button
import styles from './Cart.module.css';

const Cart = () => {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 29.99 },
    { id: 2, name: 'Product 2', price: 19.99 },
    { id: 3, name: 'Product 3', price: 39.99 },
  ];

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartHeader}>Shopping Cart</h2>
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemDetails}>
              <h5>{item.name}</h5>
              <p>${item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        <h4>Total: ${totalPrice}</h4>
      </div>
      <Button className={styles.checkoutButton} variant='primary'>
        Checkout
      </Button>
    </div>
  );
};

export default Cart;
