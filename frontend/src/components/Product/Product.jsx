import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Typography } from '@mui/material';

import api from '../../services/interceptor';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

const Product = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const qty = useRef();
  const navigate = useNavigate();
  const { isLoggedin } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          setProduct(data);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
  const handleAddToCart = () => {
    if (isLoggedin) {
      const quantity = qty.current.value;
      addToCart(product._id, quantity);
    } else {
      navigate('/login');
    }
  };
  return (
    <Container className='mt-5'>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant='top' src='https://via.placeholder.com/300' />
          </Card>
        </Col>
        <Col md={6}>
          <Typography variant='h4' component='h1' gutterBottom>
            {product.title}
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            ₹ {product.price}
          </Typography>
          <Typography variant='body1' paragraph>
            {product.description}
          </Typography>
          <div className='d-flex align-items-center mb-2'>
            <Typography>Quantity: </Typography>
            <select ref={qty}>
              {numbers.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={handleAddToCart} variant='primary'>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
