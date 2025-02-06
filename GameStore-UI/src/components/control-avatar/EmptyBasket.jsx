import { SentimentDissatisfied } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';

export const EmptyBasket = () => {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Typography>Your basket is empty</Typography>
      <SentimentDissatisfied fontSize="large" />
    </Box>
  );
};
