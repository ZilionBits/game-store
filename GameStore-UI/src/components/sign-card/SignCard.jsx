import { Stack, styled } from '@mui/material';

export const SignCard = styled(Stack)(({ theme }) => ({
  position: 'relative',
  width: '350px',
  height: '600px',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  boxShadow: theme.shadows[5],
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
}));
