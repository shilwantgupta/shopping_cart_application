import { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/interceptor';
import { toast } from 'react-toastify';

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState({});

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const returnTo = queryParams.get('returnTo') || '/';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token) setIsLoggedin(true);
    if (user) setUser(user);
  }, []);

  const login = (user) => {
    api
      .post('/auth/login', user)
      .then((res) => {
        if (res.status === 200) {
          toast.success('Login successfully!');
          const { data, token } = res.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(data));
          if (token) setIsLoggedin(true);
          if (data) setUser(data);

          // if (returnTo) {
          //   navigate(returnTo);
          // }
          if (data.isAdmin) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }
      })
      .catch((err) => console.log(err));
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedin(false);
    setUser({});
    toast.success('Logout successfully!');
    navigate('/');
  };
  return (
    <AuthContext.Provider value={{ isLoggedin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
