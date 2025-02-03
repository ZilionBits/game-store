import { Card, CardContent, CardHeader, CardMedia, Paper, styled, Typography } from '@mui/material';
import { useUserAuth } from '../authorization/UserAuth';
import { useEffect, useState } from 'react';

export const ProfilePage = () => {
  const { user } = useUserAuth();
  const [sessionStarted, setSessionStarted] = useState();
  const [sessionExpire, setSessionExpire] = useState();

  useEffect(() => {
    if (user) {
      const startTime = new Date(user?.iat * 1000 + 2 * 60 * 60 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19);
      const endTime = new Date(user?.exp * 1000 + 2 * 60 * 60 * 1000).toISOString().replace('T', ' ').substring(0, 19);

      setSessionStarted(startTime);
      setSessionExpire(endTime);
    } else {
      setSessionStarted(null);
      setSessionExpire(null);
    }
  }, [user]);

  return (
    <Card sx={{ marginTop: '10vh', maxWidth: '500px' }}>
      <CardHeader
        avatar={
          <CardMedia
            component="img"
            image="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2JlZzVidnh1YWl4dmNteWVnOWE4emkzbHk2dmc2eGEzYjVzdDN2NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aQwvKKi4Lv3t63nZl9/giphy.gif"
            sx={{
              borderRadius: '50%',
              width: 80,
              height: 80,
            }}
          />
        }
        title={`Hello, ${user?.username || 'Guest'}`}
        subheader="View your account details"
        sx={{
          gap: 3,
        }}
      />
      <CardContent sx={{ height: 'auto', rowGap: 1 }}>
        <Typography>Username: {user?.username || 'Guest'}</Typography>
        <Typography>Email: {user?.email || 'Guest'}</Typography>
        <Typography>Role: {user?.roles || 'Guest'}</Typography>
        <Typography>Session started: {sessionStarted || 'Guest'}</Typography>
        <Typography>Session expire: {sessionExpire || 'Guest'}</Typography>
      </CardContent>
    </Card>
  );
};
