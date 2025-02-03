import { Stack, Typography, Button, styled, keyframes, Divider } from '@mui/material';
import { Link, Router } from 'react-router';
import { useUserAuth } from '../authorization/UserAuth';

const pulseGlowOuter = keyframes`
      0% {
        box-shadow: 0px 0px 25px;
      }
      100% {
        box-shadow: 0px 0px 1px;
      }
`;
const pulseGlowInner = keyframes`
      0% {
        box-shadow:inset 0px 0px 0px;
      }
      100% {
        box-shadow:inset 0px 0px 25px;
      }
`;

const GlowButton = styled(Button)({
  width: '150px',
  animation: `${pulseGlowOuter} 1s ease infinite alternate-reverse`,
  '&:hover': {
    animation: `${pulseGlowInner} 1s ease 0s infinite alternate`,
  },
});

export const Homepage = () => {
  const { user } = useUserAuth();

  return (
    <Stack
      divider={<Divider flexItem sx={{ width: '75%', margin: '24px auto' }}></Divider>}
      sx={{ width: '80%', margin: 'auto', alignItems: 'center', justifyContent: 'center', maxWidth: '576px' }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          textAlign: 'center',
          fontSize: '2.5rem',
        }}
      >
        Welcome to the Game Store!
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: 'secondary.main',
          textAlign: 'center',
        }}
      >
        Here you can find everything to suit your gaming taste.
      </Typography>
      <GlowButton component={Link} to="/store" variant="outlined">
        Explore!
      </GlowButton>
      {!user && (
        <GlowButton component={Link} to="/signin" variant="outlined">
          Sign In
        </GlowButton>
      )}
      {!user && (
        <GlowButton component={Link} to="/signup" variant="outlined">
          Sign Up
        </GlowButton>
      )}
    </Stack>
  );
};
