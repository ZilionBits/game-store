import { AppBar, Button, Toolbar } from '@mui/material';
import { Link, Outlet } from 'react-router';
import DayNightSwitch from '../day-night-switch/DayNightSwitch';

export const NavigationBar = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Button component={Link} to="/signin">
            SiIn
          </Button>
          <Button component={Link} to="/signup">
            SiUp
          </Button>
          <Button component={Link} to="/">
            Homepage
          </Button>
          <DayNightSwitch />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};
