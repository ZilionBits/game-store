import { Typography, InputLabel, Input, Button, Divider, FormHelperText, FormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import { SignCard } from '../sign-card/SignCard';
import { useState } from 'react';
import { useUserAuth } from '../authorization/UserAuth';

export const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [signUpFormError, setSignUpFormError] = useState({
    username: false,
    usernameErrorMessage: ' ',
    email: false,
    emailErrorMessage: ' ',
    password: false,
    passwordErrorMessage: ' ',
  });
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const inputValidation = (key, value) => {
    let isValid = false;

    if (key === 'username') {
      isValid = value.length >= 3;
      if (isValid) {
        setSignUpFormError((error) => ({ ...error, usernameErrorMessage: ' ' }));
      }
    }
    if (key === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      if (isValid) {
        setSignUpFormError((error) => ({ ...error, emailErrorMessage: ' ' }));
      }
    }
    if (key === 'password') {
      isValid = value.length >= 6;
      if (isValid) {
        setSignUpFormError((error) => ({ ...error, passwordErrorMessage: ' ' }));
      }
    }
    return isValid;
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setSignUpForm((form) => ({ ...form, [key]: value }));
    setSignUpFormError((error) => ({ ...error, [key]: !inputValidation(key, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      signUpForm.username.length < 3 ||
      signUpForm.password.length < 6 ||
      signUpFormError.email ||
      signUpForm.email.length == 0
    ) {
      if (signUpForm.username.length < 3) {
        setSignUpFormError((error) => ({ ...error, usernameErrorMessage: 'Username must be at least 3 characters.' }));
      }
      if (signUpFormError.email || signUpForm.email.length == 0) {
        setSignUpFormError((error) => ({ ...error, emailErrorMessage: 'Email must be valid.' }));
      }
      if (signUpForm.password.length < 6) {
        setSignUpFormError((error) => ({ ...error, passwordErrorMessage: 'Password must be at least 6 characters.' }));
      }
      return;
    }

    signUp(signUpForm)
      .then(navigate('/signin'))
      .catch((error) => {
        console.error(error.response);
      });
  };

  return (
    <SignCard>
      <Typography variant="h3" color="primary" letterSpacing={10}>
        SIGN UP
      </Typography>
      <form noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '80%' }}>
        <FormControl>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            name="username"
            type="text"
            value={signUpForm.username}
            onChange={handleChange}
            autoFocus
            autoComplete="off"
          />
          <FormHelperText error={signUpFormError.username}>{signUpFormError.usernameErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={signUpForm.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <FormHelperText error={signUpFormError.email}>{signUpFormError.emailErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={signUpForm.password}
            onChange={handleChange}
            autoComplete="off"
          />
          <FormHelperText error={signUpFormError.password}>{signUpFormError.passwordErrorMessage}</FormHelperText>
        </FormControl>
        <Button variant="outlined" onClick={handleSubmit} type="submit">
          Sign Up
        </Button>
      </form>
      <Divider flexItem variant="middle">
        or
      </Divider>
      <Typography>
        Already have an account? <Link to={'/signin'}>Sign In</Link>.
      </Typography>
    </SignCard>
  );
};
