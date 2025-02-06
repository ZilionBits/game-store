import { Typography, InputLabel, Input, Button, Divider, FormHelperText, FormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import { SignCard } from '../sign-card/SignCard';
import { useState } from 'react';
import { useUserAuth } from '../authorization/UserAuth';

export const SignIn = () => {
  const [signInForm, setSignInForm] = useState({
    username: '',
    password: '',
  });
  const [signInFormError, setSignInFormError] = useState({
    username: false,
    usernameErrorMessage: ' ',
    password: false,
    passwordErrorMessage: ' ',
  });
  const { signIn } = useUserAuth();
  const navigate = useNavigate();

  const inputValidation = (key, value) => {
    let isValid = false;

    if (key === 'username') {
      isValid = value.length >= 3;
      if (isValid) {
        setSignInFormError((error) => ({ ...error, usernameErrorMessage: ' ' }));
      }
    }
    if (key === 'password') {
      isValid = value.length >= 6;
      if (isValid) {
        setSignInFormError((error) => ({ ...error, passwordErrorMessage: ' ' }));
      }
    }
    return isValid;
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setSignInForm((form) => ({ ...form, [key]: value }));
    setSignInFormError((error) => ({ ...error, [key]: !inputValidation(key, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signInForm.username.length < 3 || signInForm.password.length < 6) {
      if (signInForm.username.length < 3) {
        setSignInFormError((error) => ({ ...error, usernameErrorMessage: 'Username must be at least 3 characters.' }));
      }
      if (signInForm.password.length < 6) {
        setSignInFormError((error) => ({ ...error, passwordErrorMessage: 'Password must be at least 6 characters.' }));
      }
      return;
    }

    signIn(signInForm)
      .then(navigate('/store'))
      .catch((error) => {
        console.error(error.response);
      });
  };

  return (
    <SignCard>
      <Typography variant="h3" color="primary" letterSpacing={10}>
        SIGN IN
      </Typography>
      <form noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '80%' }}>
        <FormControl>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            name="username"
            type="text"
            value={signInForm.username}
            onChange={handleChange}
            autoFocus
          />
          <FormHelperText error={signInFormError.username}>{signInFormError.usernameErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={signInForm.password}
            onChange={handleChange}
            autoComplete="off"
          />
          <FormHelperText error={signInFormError.password}>{signInFormError.passwordErrorMessage}</FormHelperText>
        </FormControl>
        <Button variant="outlined" onClick={handleSubmit} type="submit">
          Sign In
        </Button>
      </form>
      <Divider flexItem variant="middle">
        or
      </Divider>
      <Typography>
        Create new account <Link to={'/signup'}>Sign Up</Link>.
      </Typography>
    </SignCard>
  );
};
