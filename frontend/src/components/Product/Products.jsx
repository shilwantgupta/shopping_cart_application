import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import api from '../../services/interceptor';
import { Col, Container, Row } from 'react-bootstrap';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    api.get('/products').then((res) => {
      if (res.status === 200) {
        const { data } = res.data;
        setProducts(data);
      }
    }).catch;
  }, []);
  return (
    <Container>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} md={3} sm={6} xs={12}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <div>No products found</div>
        )}
      </Row>
    </Container>
  );
};

export default Products;
