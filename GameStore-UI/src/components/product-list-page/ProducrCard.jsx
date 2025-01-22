import { Card, CardActionArea, CardActions, CardContent, CardMedia } from '@mui/material';

export const ProductCard = ({ props }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia />
        <CardContent></CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  );
};
