import { Badge, Button, Box, Typography, Modal, Stack } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { ModalContentCard } from './ModalContentCard';
import { GlobalContext } from '../global-context/AppContext';
import { EmptyBasket } from './EmptyBasket';
import { BuyClick } from '../buy-click/BuyClick';
import { useUserAuth } from '../authorization/UserAuth';

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

export const ControlCart = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { itemsCount, setBasketItems } = useContext(GlobalContext);
  const { user } = useUserAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleBuyClick = (event) => {
    setAnchorEl(event.currentTarget);
    {
      user &&
        setTimeout(() => {
          handleBuyClose();
          handleClose();
          setBasketItems(new Set());
        }, 2000);
    }
  };

  const handleBuyClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <Badge
          overlap="circular"
          color="secondary"
          max={9}
          badgeContent={itemsCount}
          sx={{
            '& .MuiBadge-badge': {
              minWidth: '0px',
              height: '15px',
              width: '15px',
            },
          }}
        >
          <ShoppingCart color="primary" sx={{ height: '25px', width: '25px' }} />
        </Badge>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your selected items:
          </Typography>
          <Stack id="modal-modal-description" sx={{ mt: 2, border: '1px solid', padding: 1 }}>
            {itemsCount === 0 ? <EmptyBasket /> : <ModalContentCard />}
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Button onClick={handleClose}>Continue browsing</Button>
            {itemsCount > 0 && <Button onClick={handleBuyClick}>Buy</Button>}
          </Stack>
          <BuyClick anchorEl={anchorEl} handleClose={handleBuyClose} />
        </Box>
      </Modal>
    </>
  );
};
