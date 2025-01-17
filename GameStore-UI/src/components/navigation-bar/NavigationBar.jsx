import { AppBar, Button, Toolbar, useColorScheme } from '@mui/material';
import { Link, Outlet } from 'react-router';

export const NavigationBar = () => {

    const {mode, setMode} = useColorScheme();
    if(!mode){
        return null;
    }

  return (
    <>
      <AppBar elevation={0} position='sticky' sx={{top:'0px'}}>
        <Toolbar>
          <Button component={Link} to='/signin'>Sign In</Button>
          <Button component={Link} to="/signup">Sign Up</Button>
          <Button component={Link} to="/">Homepage</Button>
          <Button onClick={() => setMode('light')} color='warning'>Light</Button>
          <Button onClick={() => setMode('dark')} color='success'>Dark</Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};
