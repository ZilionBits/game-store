import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const authAxios = axios.create({
  baseURL: 'http://localhost:8080/auth',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AuthContext = createContext();

export const UserAuth = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [adminMessage, setAdminMessage] = useState();

  const signUp = async (signUpForm) => {
    const response = await authAxios.post('/signUp', signUpForm);
    return response;
  };

  const signIn = async (signInForm) => {
    const response = await authAxios.post('/signIn', signInForm);
    const token = response.data.token;
    setToken(token);
    localStorage.setItem('token', token);

    setUserInfo(token);

    return response;
  };

  const setUserInfo = (token) => {
    const decodedUser = jwtDecode(token);
    const userInfo = {
      ...decodedUser,
      roles: decodedUser.roles === '[ROLE_ADMIN]' ? 'ADMIN' : 'USER',
    };
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
  };

  useEffect(() => {
    if (!token) return;
    const adminCheck = async () => {
      const response = await authAxios('/welcome', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const message = response.data;
      setAdminMessage(message);
    };
    adminCheck();
  }, [token]);

  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isTokenExpired = () => {
    if (user !== null) {
      if (user.exp * 1000 < Date.now()) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (user !== null) {
      const isExpired = isTokenExpired();
      const msTillTokenExpire = user.exp * 1000 - Date.now();
      if (isExpired) {
        console.log(isExpired + 'logging out');
        logOut();
      } else {
        setTimeout(() => {
          logOut();
          console.log('tokenExpired, please sign in again.');
        }, msTillTokenExpire);
      }
    }
  }, [user]);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <AuthContext.Provider value={{ adminMessage, token, user, signIn, signUp, logOut, isTokenExpired, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(AuthContext);
