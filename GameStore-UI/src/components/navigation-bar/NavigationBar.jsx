import { AppBar, Button, Toolbar, Stack } from '@mui/material';
import { Link, Outlet } from 'react-router';
import { ControlAvatar } from '../control-avatar/ControlAvatar';
import { ControlCart } from '../control-avatar/ControlCart';
import { Home, Store } from '@mui/icons-material';

export const NavigationBar = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <AppBar position="sticky">
        <Toolbar>
          <Stack direction="row">
            <Button component={Link} to="/">
              <Home fontSize="large" />
            </Button>
            <Button component={Link} to="/store">
              <Store fontSize="large" />
            </Button>
          </Stack>
          <Stack direction="row">
            <ControlCart />
            <ControlAvatar />
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};
