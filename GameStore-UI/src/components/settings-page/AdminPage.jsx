import { CardContent, Typography } from '@mui/material';
import { useUserAuth } from '../authorization/UserAuth';

export const AdminPage = () => {
  const { adminMessage } = useUserAuth();

  return (
    <CardContent>
      <Typography>{adminMessage}</Typography>
    </CardContent>
  );
};
