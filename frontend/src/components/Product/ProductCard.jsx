import React from 'react';
import styles from './product.module.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const randomImage = `https://picsum.photos/200/300?random=${Math.floor(
    Math.random() * 1000
  )}`;
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className={styles.productCard} onClick={() => handleClick(product._id)} role='presentation'>
      <img src={randomImage} alt='Random' className={styles.image} />
      <h2 className={styles.title}>
        {product.title.length > 20
          ? product.title.substring(0, 20) + '...'
          : product.title}
      </h2>
      <p className={styles.description}>
        {product.description.length > 52
          ? product.description.substring(0, 52) + '...'
          : product.description}
      </p>
      <p className={styles.price}>₹ {product.price}</p>
    </div>
  );
};

export default ProductCard;
