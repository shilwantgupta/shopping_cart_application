import React, { useContext, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';

import { CartContext } from '../../context/CartContext';


const Cart = () => {
  const { cart, removeFromCart, updateQuantity,onCheckout } = useContext(CartContext);

  const total = cart?.items?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const numbers = Array.from({ length: 10 }, (_, index) => index);

  
  return (
    <Container>
      <h2>Your Cart</h2>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.items?.map((item) => (
                <tr key={item._id}>
                  <td>{item?.product?.title}</td>
                  <td>₹{item?.product?.price}</td>
                  <td>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.product._id, e.target.value)
                      }
                    >
                      {numbers.map((number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>₹{(item.product.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant='danger'
                      onClick={() => removeFromCart(item?.product?._id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4>Total: ₹{total.toFixed(2)}</h4>
          <Button variant='primary' onClick={onCheckout}>
            Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
