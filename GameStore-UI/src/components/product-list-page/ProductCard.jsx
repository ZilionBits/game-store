import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Button,
  Grid2,
  Stack,
  Modal,
  Box,
} from '@mui/material';
import { BuyClick } from '../buy-click/BuyClick';
import { useState } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { ModifyGames } from '../settings-page/admin-functions/ModifyGames';

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

export const ProductCard = (props) => {
  const { name, platforms, metascore, image_url, price, genres, addToBasket, deleteGame, user, gameData } = props;

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(!openModal);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setTimeout(handleClose, 2000);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        width: '100%',
        position: 'relative',
      }}
    >
      <CardActionArea>
        <Grid2 container>
          <Grid2 size={{ xs: 6, sm: 12 }}>
            <CardMedia component={'img'} image={image_url} sx={{ height: '200px' }} />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 12 }}>
            <CardContent sx={{ padding: '0px', height: { xs: '200px', sm: '150px' } }}>
              <CardHeader title={name} subheader={platforms} avatar={metascore} sx={{ padding: '5px 0px 5px 0px' }} />
              <Typography variant="caption" sx={{ marginLeft: '8px' }}>
                Category: {genres}
              </Typography>
              <Typography sx={{ textAlign: 'end', marginRight: '8px' }}>
                {price != 0 ? `${price} €` : 'Free-to-play'}
              </Typography>
              {user?.roles === 'ADMIN' && (
                <Stack direction="row" sx={{ marginLeft: '8px', '& :hover': { fill: 'red' } }}>
                  <Delete onClick={deleteGame} />
                  <Edit onClick={handleOpenModal} />
                </Stack>
              )}
            </CardContent>
          </Grid2>
        </Grid2>
      </CardActionArea>
      <CardActions>
        <Button onClick={addToBasket}>Add to basket</Button>
        <Button onClick={handleClick}>Buy now</Button>
      </CardActions>
      <BuyClick anchorEl={anchorEl} handleClose={handleClose} gameName={name} />
      <Modal
        open={openModal}
        onClose={handleOpenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
        <Box sx={style}>
          <ModifyGames gameData={gameData} handleClose={handleOpenModal}/>
        </Box>
      </Modal>
    </Card>
  );
};
