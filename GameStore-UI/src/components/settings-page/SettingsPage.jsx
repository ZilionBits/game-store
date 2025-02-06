import { Settings } from '@mui/icons-material';
import { Card, CardHeader } from '@mui/material';
import { useUserAuth } from '../authorization/UserAuth';
import { GuestContent } from './GuestContent';
import { AdminPage } from './AdminPage';
import { UserPage } from './UserPage';

export const SettingsPage = () => {
  const { user } = useUserAuth();

  return (
    <Card sx={{ marginTop: '10vh' }}>
      <CardHeader
        avatar={<Settings />}
        title="Settings"
        subheader={`Available settings for your role: ${user?.roles || 'Guest'}`}
      ></CardHeader>
      {user?.roles === 'ADMIN' ? <AdminPage /> : user?.roles === 'USER' ? <UserPage /> : <GuestContent />}
    </Card>
  );
};
