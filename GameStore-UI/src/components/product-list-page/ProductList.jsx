import { ProductCard } from './ProductCard';
import storeData from '../../temp/game_data.json';
import { Box, Grid2 } from '@mui/material';

export const ProductListPage = () => {
  console.log(storeData);

  return (
    <>
      <h1>Store List</h1>
      <Grid2 container spacing={2} justifyContent={'space-evenly'}>
        {storeData.map((data, index) => (
          <ProductCard
            key={index}
            name={data.name}
            platforms={data.platforms.join(' ')}
            metascore={data.metascore}
            image_url={data.image_url}
            price={data.price}
            genres={data.genres.join(' ')}
          />
        ))}
      </Grid2>
    </>
  );
};
