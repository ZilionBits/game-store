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
} from '@mui/material';
import { BuyClick } from '../buy-click/BuyClick';
import { useState } from 'react';
import { Delete } from '@mui/icons-material';

export const ProductCard = (props) => {
  const { name, platforms, metascore, image_url, price, genres, addToBasket, deleteGame, user } = props;

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
                Genre: {genres}
              </Typography>
              <Typography sx={{ textAlign: 'end', marginRight: '8px' }}>
                {price != 0 ? `${price} €` : 'Free-to-play'}
              </Typography>
            </CardContent>
          </Grid2>
        </Grid2>
      </CardActionArea>
      <CardActions>
        <Button onClick={addToBasket}>Add to basket</Button>
        <Button onClick={handleClick}>Buy now</Button>
      </CardActions>
      <BuyClick anchorEl={anchorEl} handleClose={handleClose} gameName={name} />
      {user?.roles === 'ADMIN' && (
        <Delete
          sx={{ position: 'absolute', zIndex: 1, top: 5, right: 5, cursor: 'not-allowed' }}
          onClick={deleteGame}
        />
      )}
    </Card>
  );
};
