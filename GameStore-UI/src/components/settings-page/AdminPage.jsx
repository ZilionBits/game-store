import { CardContent, Typography, Button, Modal, Box, Stack } from '@mui/material';
import { useUserAuth } from '../authorization/UserAuth';
import { useState } from 'react';
import { ModifyCategories } from './admin-functions/ModifyCategories';
import { ModifyGames } from './admin-functions/ModifyGames';
import { ModifyUsers } from './admin-functions/ModifyUsers';

const style = {
  margin: '10vh auto',
  width: '90vw',
  minWidth: '380px',
  maxWidth: '800px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export const AdminPage = () => {
  const [openModal, setOpenModal] = useState(null);
  const handleOpenCategory = () => setOpenModal('Category');
  const handleOpenGame = () => setOpenModal('Game');
  const handleOpenUser = () => setOpenModal('User');
  const handleClose = () => setOpenModal(null);

  const { adminMessage } = useUserAuth();

  return (
    <CardContent>
      <Typography textAlign="center">{adminMessage}</Typography>
      <Stack direction="row" justifyContent="space-between" sx={{ margin: '10px 0px' }}>
        <Button onClick={handleOpenCategory}>Modify categories</Button>
        <Button onClick={handleOpenGame}>Modify games</Button>
        <Button onClick={handleOpenUser}>Modify users</Button>
      </Stack>
      <Modal
        open={Boolean(openModal)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
        <Box sx={style}>
          {openModal === 'Category' && <ModifyCategories handleClose={handleClose} />}
          {openModal === 'Game' && <ModifyGames handleClose={handleClose}/>}
          {openModal === 'User' && <ModifyUsers />}
        </Box>
      </Modal>
    </CardContent>
  );
};
