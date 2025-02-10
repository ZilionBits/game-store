import { Backdrop, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';

export const DataLoading = ({ open }) => {
  return (
    <Backdrop sx={{ flexDirection: 'column', gap: 3 }} transitionDuration={1000} open={open}>
      <CircularProgress/>
      <Typography padding={2} align="center">
        The server has gone to sleep for a moment, please&nbsp;wait...
      </Typography>
    </Backdrop>
  );
};
