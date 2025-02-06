import { Button, CardContent, Divider, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router';
import { GlobalContext } from '../global-context/AppContext';

export const GuestContent = () => {
  const { setBasketItems } = useContext(GlobalContext);

  return (
    <CardContent sx={{ height: 'auto', maxWidth: '600px' }}>
      <Stack direction={'row'} gap={3} alignItems={'center'}>
        <Typography>Clear items from basket: </Typography>
        <Button
          onClick={() => {
            setBasketItems(new Set());
          }}
          variant="outlined"
        >
          Clear
        </Button>
      </Stack>
      <Divider sx={{ margin: '1rem' }} />
      <Typography variant="h3" textAlign={'center'}>
        For more settings please <Link to="/signup">Sign Up</Link> or <Link to="/signin">Sign In</Link>
      </Typography>
    </CardContent>
  );
};
