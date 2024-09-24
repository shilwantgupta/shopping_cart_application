import React from 'react';
import { Carousel } from 'react-bootstrap';

import style from './home.module.css';
// Dummy image URLs
const images = [
  'https://picsum.photos/800/400?random=1',
  'https://picsum.photos/800/400?random=2',
  'https://picsum.photos/800/400?random=3',
];

const Header = () => {
  return (
    <Carousel>
      {images.map((img, index) => (
        <Carousel.Item key={index}>
          <img
            className={style.carouselImage}
            src={img}
            alt={`Slide ${index + 1}`}
          />
          <Carousel.Caption>
            <h3>Slide {index + 1}</h3>
            <p>This is a description for slide {index + 1}.</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Header;
