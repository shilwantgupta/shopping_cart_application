import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className='footer-bottom'>
        <p className='m-0'>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
