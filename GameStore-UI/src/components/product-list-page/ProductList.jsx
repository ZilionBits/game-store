import { ProductCard } from './ProductCard';
import { Container, Grid2, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../global-context/AppContext';
import { DataLoading } from './DataLoading';
import { CategoriesFilter } from './CategoriesFilter';
import { NameFilter } from './NameFilter';
import { PlatformsFilter } from './PlatformsFilter';
import { useUserAuth } from '../authorization/UserAuth';

export const ProductListPage = () => {
  const { gamesData, isLoading, isError, addToBasket, platformsData } = useContext(GlobalContext);
  const { user } = useUserAuth();
  const [filterGamesData, setFilterGamesData] = useState([]);
  const [categories, setCategories] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

  useEffect(() => {
    const filterCategories = [...new Set(gamesData.flatMap((game) => game.genres.map((genre) => genre.name)))];
    setCategories(filterCategories);
  }, [gamesData]);

  useEffect(() => {
    let newArr = gamesData;

    if (selectedCategory) {
      newArr = newArr.filter((game) => game.genres.some((genre) => genre.name.includes(selectedCategory)));
    }
    if (selectedName) {
      newArr = newArr.filter((game) => game.name.includes(selectedName));
    }
    if (selectedPlatform) {
      newArr = newArr.filter((game) => game.platforms.includes(selectedPlatform));
    }
    setFilterGamesData(newArr);
  }, [selectedCategory, selectedName, selectedPlatform, gamesData]);

  const deleteGame = () => {
    
  }

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
      <Stack direction={{ sm: 'row' }}>
        <NameFilter onChange={handleNameChange} />
        <Stack direction={{ xs: 'row' }}>
          <CategoriesFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onChange={handleCategoryChange}
          />
          <PlatformsFilter
            platforms={platformsData}
            selectedPlatform={selectedPlatform}
            onChange={handlePlatformChange}
          />
        </Stack>
      </Stack>
      <Container fixed>
        <Grid2 container spacing={3}>
          {filterGamesData.map((data) => (
            <Grid2
              key={data.id}
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
                user={user}
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>
  );
};
