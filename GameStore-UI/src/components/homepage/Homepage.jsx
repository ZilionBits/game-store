import { Stack, Typography, Button } from '@mui/material';

export const Homepage = () => {
  return (
    <Stack sx={{width:'80%', margin:'auto'}}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          textAlign: 'center',
          marginTop: '10rem',
          fontSize: '2.5rem',
        }}
      >
        Welcome to the Game Store!
        <br />
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: 'secondary.main',
          textAlign: 'center',
          fontWeight: 'normal',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        Here you can find everything to suit your gaming taste.
      </Typography>
      <Button variant='outlined'>Explore!</Button>
      <Button>Sign In</Button>
      <Button>Sign Up</Button>
    </Stack>
  );
};
