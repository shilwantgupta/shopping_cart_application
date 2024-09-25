import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { Button, NavDropdown } from 'react-bootstrap';
function Appbar() {
  const { isLoggedin, user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
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
            <NavLink className='nav-link' to='/shop'>
              Shop
            </NavLink>
          </Nav>
          <Nav>
            <button onClick={gotoCart} className='cart-button'>
              <FaShoppingCart size={22} />
              {isLoggedin ? (
                <span className='cart-badge'>
                  {cart?.items?.length > 0 ? cart?.items?.length : 0}
                </span>
              ) : null}
            </button>
            {isLoggedin ? (
              <>
                <NavLink className='nav-link' to='/orders'>
                  Orders
                </NavLink>
                <NavDropdown title={user.name} id='basic-nav-dropdown'>
                  <NavDropdown.Item href='#'>
                    <Link to='/profile'>Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
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
