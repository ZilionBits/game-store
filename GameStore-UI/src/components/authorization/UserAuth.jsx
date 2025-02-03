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

  const signUp = async (signUpForm) => {
    const response = await authAxios.post('/signUp', signUpForm);
    return response;
  };

  const signIn = async (signInForm) => {
    const response = await authAxios.post('/signIn', signInForm);
    const token = response.data.token;
    setToken(token);
    localStorage.setItem('token', token);

    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
    localStorage.setItem('user', JSON.stringify(decodedUser));

    return response;
  };

  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isTokenExpired = () => {
    if (user === null) {
      return true;
    }
    if (user.exp * 1000 < Date.now()) {
      console.log(user.exp + ' ' + Date.now());
      logOut();
      return true;
    }
    return false;
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, signIn, signUp, logOut, isTokenExpired }}>{children}</AuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(AuthContext);
