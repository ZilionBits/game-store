import { ProductCard } from './ProductCard';
import storeData from '../../temp/game_data.json';
import { Box, Container, Grid2 } from '@mui/material';

export const ProductListPage = () => {
  console.log(storeData);

  return (
    <>
      <h1>Store List</h1>
      <Container fixed>
        <Grid2 container spacing={2}>
          {storeData.map((data) => (
            <Grid2
              key={data.name}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ProductCard
                name={data.name}
                platforms={data.platforms.join(' ')}
                metascore={data.metascore}
                image_url={data.image_url}
                price={data.price}
                genres={data.genres.join(' ')}
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>
  );
};
