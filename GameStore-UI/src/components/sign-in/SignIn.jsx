import { Stack, styled, Typography } from '@mui/material';

export const SignIn = () => {
  const SignInCard = styled(Stack)(({ theme }) => ({
    position: 'relative',
    width: '400px',
    height: '600px',
    margin: 'auto',
    top: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    boxShadow: theme.shadows[5],
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }));

  return (
    <>
      <SignInCard>
        <Typography variant='h2' color='primary'>SIGN IN</Typography>
        <Typography>Hello</Typography>
        <Typography>Hello</Typography>
        <Typography>Hello</Typography>
        <Typography>Hello</Typography>
      </SignInCard>
    </>
  );
};
