import axios from 'axios';
import { useState } from 'react';

const authAxios = axios.create({
  baseURL: 'http://localhost:8080/auth',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const UserAuth = () => {
  const [token, setToken] = useState();

  const signUp = async (signUpForm) => {
    const response = await authAxios.post('/signUp', signUpForm);
    return response;
  };

  const signIn = async (signInForm) => {
    const response = await authAxios.post('/signIn', signInForm);
    setToken(response.data);
    return response;
  };

  return { signIn, signUp };
};

export default UserAuth;
