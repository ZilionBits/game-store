import { AppBar, Button, Toolbar } from '@mui/material';
import { Link, Outlet } from 'react-router';
import DayNightSwitch from '../day-night-switch/DayNightSwitch';

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
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};
