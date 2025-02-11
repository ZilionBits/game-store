import { CardContent, Typography, Button, Modal, Box } from '@mui/material';
import { useUserAuth } from '../authorization/UserAuth';
import { useState } from 'react';
import { ModifyCategories } from './admin-functions/ModifyCategories';

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { adminMessage } = useUserAuth();

  return (
    <CardContent>
      <Typography>{adminMessage}</Typography>
      <Button onClick={handleOpen}>Modify categories</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
        <Box sx={style}>
          <ModifyCategories handleClose={handleClose}/>
        </Box>
      </Modal>
    </CardContent>
  );
};
