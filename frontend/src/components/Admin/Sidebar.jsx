import React, { useContext, useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import { FaHome } from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';
import { FaUserCircle } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaList } from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const { logout } = useContext(AuthContext);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Dashboard', url: '/', icon: <FaHome size={20} /> },
    { text: 'Users', url: '/users', icon: <FaUsers size={20} /> },
    { text: 'Products', url: '/products', icon: <FaList size={20} /> },
    { text: 'Orders', url: '/orders', icon: <FaListCheck size={20} /> },
  ];

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant='permanent'
        open={open}
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 240 : 60,
            transition: 'width 0.3s',
            backgroundColor: '#ebedf0', // Sidebar background color (dark)
            color: '#000', // Text color
            overflowX: 'hidden',
          },
        }}
      >
        <List sx={{ pt: 0 }}>
          <ListItem
            sx={{
              backgroundColor: '#0d6efd',
              justifyContent: open ? 'flex-end' : 'center',
              padding: open ? '12px 16px' : '12px',
            }}
          >
            <IconButton onClick={toggleSidebar} sx={{ color: '#fff' }}>
              <CiMenuBurger />
            </IconButton>
          </ListItem>

          {menuItems.map((item, index) => (
            <NavLink
              end
              className='side-link'
              to={`/admin${item.url}`}
              key={index}
            >
              <ListItem button>
                <ListItemIcon sx={{ color: '#000' }}>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>

      <div style={{ flexGrow: 1 }}>
        <AppBar position='fixed' sx={{ backgroundColor: '#0d6efd' }}>
          <Toolbar
            style={{ justifyContent: 'space-between', paddingLeft: 280 }}
          >
            <Typography variant='h6' noWrap>
              Admin Panel
            </Typography>

            <IconButton onClick={handleUserMenuClick} color='inherit'>
              <FaUserCircle size={24} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <main style={{ padding: '16px', marginTop: '4rem' }}>{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
