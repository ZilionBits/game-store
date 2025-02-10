import {
  Box,
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
import { Link } from 'react-router';

export const ProductCard = (props) => {
  const { name, platforms, metascore, image_url, price, genres, addToBasket } = props;

  return (
    <Card
      sx={{
        width: '90vw',
      }}
    >
      <CardActionArea>
        <Grid2 container>
          <Grid2 size={{ xs: 6, sm: 12 }}>
            <CardMedia image={image_url} sx={{ height: '200px' }} />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 12 }}>
            <CardContent sx={{ padding: '0px', height:{xs: '200px', sm: '150px'} }}>
              <CardHeader title={name} subheader={platforms} avatar={metascore} sx={{ padding: '5px 0px 5px 0px' }} />
              <Typography component={Box} variant="caption" sx={{ marginLeft: '8px' }}>
                Genre: {genres}
              </Typography>
              <Typography component={Box} sx={{ textAlign: 'end', marginRight: '8px' }}>
                {price !== 0 ? `${price} €` : 'Free-to-play'}
              </Typography>
            </CardContent>
          </Grid2>
        </Grid2>
      </CardActionArea>
      <CardActions>
        <Button onClick={addToBasket}>Add to basket</Button>
        <Button component={Link}>Buy now</Button>
      </CardActions>
    </Card>
  );
};
