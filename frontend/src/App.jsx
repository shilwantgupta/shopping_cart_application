import { useState, lazy, useContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './context/AuthContext';

// Header-Footer
const Navbar = lazy(() => import('./components/Appbar'));
const Footer = lazy(() => import('./components/Footer'));

// Routes
const AdminRoute = lazy(() => import('./routes/AdminRoute'));
const PublicRoute = lazy(() => import('./routes/PublicRoute'));
const PrivateRoute = lazy(() => import('./routes/PrivateRoute'));

//Auth
const Login = lazy(() => import('./components/Auth/Login'));
const Signup = lazy(() => import('./components/Auth/Signup'));
const Profile = lazy(() => import('./components/Profile'));

//Cart
const Cart = lazy(() => import('./components/Cart/Cart'));
const Orders = lazy(() => import('./components/Cart/Orders'));

//Error
const NotFound = lazy(() => import('./components/Error/404'));
const Forbidden = lazy(() => import('./components/Error/403'));

const Home = lazy(() => import('./components/Home/Home'));
const Shop = lazy(() => import('./components/Product/Products'));
const Product = lazy(() => import('./components/Product/Product'));
// Admin components
const Dashboard = lazy(() => import('./components/Admin/Dashboard'));
const Products = lazy(() => import('./components/Admin/Product/Products'));
const AddProduct = lazy(() => import('./components/Admin/Product/AddProduct'));

const Users = lazy(() => import('./components/Admin/User/Users'));
const AOrders = lazy(() => import('./components/Admin/Order/Orders'));
function App() {
  const { isLoggedin, user } = useContext(AuthContext);
  return (
    <>
      <Suspense fallback={'Loading....'}>
        {isLoggedin && user.isAdmin ? null : <Navbar />}

        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/product/:id' element={<Product />} />
            <Route element={<PublicRoute />}>
              <Route path='/login' element={<Login />} />
              <Route path='/sign-up' element={<Signup />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path='/cart' element={<Cart />} />
              <Route path='/orders' element={<Orders />} />

              <Route path='/profile' element={<Profile />} />
            </Route>

            <Route path='/admin/*' exact={true} element={<AdminRoute />}>
              <Route path='' element={<Dashboard />} />
              <Route path='products' element={<Products />} />
              <Route path='add-product' element={<AddProduct />} />
              <Route path='edit-product/:id' element={<AddProduct />} />
              <Route path='users' element={<Users />} />
              <Route path='orders' element={<AOrders />} />
            </Route>
            <Route path='/unauthorized' element={<Forbidden />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        {isLoggedin && user.isAdmin ? null : <Footer />}
        <ToastContainer autoClose={1000} />
      </Suspense>
    </>
  );
}

export default App;
