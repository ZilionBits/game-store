import { ProductCard } from './ProductCard';
import { Container, Grid2 } from '@mui/material';
import { useContext } from 'react';
import { GlobalContext } from '../global-context/AppContext';

export const ProductListPage = () => {
  const { gamesData, isLoading, isError, addToBasket } = useContext(GlobalContext);

  if (isLoading || isError) {
    if (isLoading) {
      return <h1>Data is loading...</h1>;
    }
    return <h1>Something went wrong...</h1>;
  }

  return (
    <>
      <h1>Store list</h1>
      <Container fixed>
        <Grid2 container spacing={2}>
          {gamesData.map((data) => (
            <Grid2
              key={data.name}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ProductCard
                name={data.name}
                platforms={data.platforms.join(' ')}
                metascore={data.metaScore}
                image_url={data.imageUrl}
                price={data.price}
                genres={data.genres.map((genre) => genre.name).join(' ')}
                addToBasket={() => addToBasket(data.id)}
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>
  );
};
