import { AppBar, Button, Toolbar, Stack } from '@mui/material';
import { Link, Outlet } from 'react-router';
import DayNightSwitch from '../day-night-switch/DayNightSwitch';
import { ControlAvatar } from '../control-avatar/ControlAvatar';
import { ControlCart } from '../control-avatar/ControlCart';

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
          <DayNightSwitch />
          <Button component={Link} to="/">
            Homepage
          </Button>
          <Button component={Link} to="/store">
            Store
          </Button>
          <Stack direction="row" spacing={2} alignItems="end">
            <ControlCart />
            <ControlAvatar />
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};
