import { ProductCard } from './ProductCard';
import { Container, Grid2, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../global-context/AppContext';
import { DataLoading } from './DataLoading';
import { CategoriesFilter } from './CategoriesFilter';

export const ProductListPage = () => {
  const { gamesData, isLoading, isError, addToBasket } = useContext(GlobalContext);
  const [filterGamesData, setFilterGamesData] = useState([]);
  const [categories, setCategories] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    setFilterGamesData(gamesData);
    const filterCategories = [...new Set(gamesData.flatMap((game) => game.genres.map((genre) => genre.name)))];
    setCategories(filterCategories);
  }, [gamesData]);

  useEffect(() => {
    if (selectedCategory) {
      const newArr = gamesData.filter((game) => game.genres.some((genre) => genre.name.includes(selectedCategory)));
      setFilterGamesData(newArr);
    } else {
      setFilterGamesData(gamesData);
    }
  }, [selectedCategory]);

  if (isLoading || isError) {
    if (isLoading) {
      return <DataLoading open={isLoading} />;
    }
    return (
      <Typography variant="h4" align="center" color="warning">
        Oops!
        <br />
        Something went wrong...
      </Typography>
    );
  }

  return (
    <>
      <CategoriesFilter categories={categories} selectedCategory={selectedCategory} onChange={handleCategoryChange} />
      <Container fixed>
        <Grid2 container spacing={3}>
          {filterGamesData.map((data) => (
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
