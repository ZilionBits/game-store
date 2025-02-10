import { Popover, Alert } from '@mui/material';
import { Check, Warning } from '@mui/icons-material';
import { useUserAuth } from '../authorization/UserAuth';

export const BuyClick = ({ anchorEl, handleClose, gameName }) => {
  const { user } = useUserAuth();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      {user ? (
        <Alert icon={<Check />} severity="success">
          {gameName ? `${gameName} successfully bought!` : 'Thank you for your purchase, GLHF!'}
        </Alert>
      ) : (
        <Alert icon={<Warning />} severity="warning">
          Please Sign In to process buy.
        </Alert>
      )}
    </Popover>
  );
};
