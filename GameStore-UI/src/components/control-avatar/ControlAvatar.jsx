import { Badge, Menu, MenuItem, styled } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useState } from 'react';
import { useUserAuth } from '../authorization/UserAuth';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export const ControlAvatar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { logOut, user } = useUserAuth();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        onClick={handleClick}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: `${user ? '#44b700' : '#B22222'}`,
            color: `${user ? '#44b700' : '#B22222'}`,
          },
        }}
      >
        <AccountCircle color="primary" sx={{ height: '30px', width: '30px' }} />
      </StyledBadge>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        disableEnforceFocus
        disableAutoFocusItem
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem divider onClick={handleClose}>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            logOut();
            handleClose();
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};
