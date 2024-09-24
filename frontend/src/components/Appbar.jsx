import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

import { AuthContext } from '../context/AuthContext';
function Appbar() {
  const { isLoggedin, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const gotoCart = () => {
    navigate('/cart');
  };
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Link className='navbar-brand' to='/'>
          Shopping Cart
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavLink className='nav-link' to='/'>
              Home
            </NavLink>
            <NavLink className='nav-link' to='/'>
              Shop
            </NavLink>
          </Nav>
          <Nav>
            <button onClick={gotoCart} className='cart-button'>
              <FaShoppingCart size={22} />
              <span className='cart-badge'>0</span>
            </button>
            {isLoggedin ? (
              <>
                <NavLink className='nav-link' to='/orders'>
                  Orders
                </NavLink>
                <NavLink className='nav-link' to='/profile'>
                  {user.name}
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className='nav-link' to='/login'>
                  Login
                </NavLink>
                <NavLink className='nav-link' to='/sign-up'>
                  Signup
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;
