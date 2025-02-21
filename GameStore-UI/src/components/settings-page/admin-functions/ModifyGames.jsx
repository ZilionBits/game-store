import { Box, FormControl, InputLabel, Typography, Input, Grid2, Stack, Button } from '@mui/material';
import { ProductCard } from '../../product-list-page/ProductCard';
import { useContext, useState, useEffect } from 'react';
import { CategoriesFilter } from '../../product-list-page/CategoriesFilter';
import { GlobalContext } from '../../global-context/AppContext';
import { PlatformsFilter } from '../../product-list-page/PlatformsFilter';

export const ModifyGames = ({ handleClose, gameData }) => {
  const [categories, setCategories] = useState(new Set());
  const [addGameForm, setAddGameForm] = useState({
    id: gameData?.id || '',
    name: gameData?.name || '',
    metaScore: gameData?.metaScore || '',
    imageUrl: gameData?.imageUrl || '',
    price: gameData?.price || '',
    platforms: gameData?.platforms || [],
    genres: gameData?.genres.map((genre) => genre.name) || [],
  });

  const { genresData, platformsData, addGame, editGame } = useContext(GlobalContext);

  useEffect(() => {
    const filterCategories = [...new Set(genresData.map((genre) => genre.name))];
    setCategories(filterCategories);
  }, [genresData]);

  const handleAddFormChange = (e) => {
    if (e.target.name === 'genres' || e.target.name === 'platforms') {
      setAddGameForm((prevForm) => {
        return { ...prevForm, [e.target.name]: e.target.value };
      });
    } else {
      setAddGameForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    }
  };

  useEffect(() => {
    console.log(addGameForm);
  }, [addGameForm]);

  const handleAddGame = async () => {
    const response = await addGame(addGameForm);
    console.log(response);
  };

  const handleEditGame = () => editGame(addGameForm);

  return (
    <Box>
      <Typography gutterBottom variant="h4" color="info" textAlign={'center'}>
        {gameData ? 'Edit game' : 'Add game'}
      </Typography>
      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack gap={1} width="200px" margin="auto">
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" name="name" type="text" value={addGameForm.name} onChange={handleAddFormChange} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="metaScore">Meta Score</InputLabel>
              <Input
                id="metaScore"
                name="metaScore"
                type="text"
                value={addGameForm.metaScore}
                onChange={handleAddFormChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="imageUrl">Image URL</InputLabel>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="text"
                value={addGameForm.imageUrl}
                onChange={handleAddFormChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="price">Price</InputLabel>
              <Input id="price" name="price" type="number" value={addGameForm.price} onChange={handleAddFormChange} />
            </FormControl>
            <PlatformsFilter
              platforms={platformsData}
              selectedPlatform={addGameForm.platforms}
              onChange={handleAddFormChange}
            />
            <CategoriesFilter
              categories={categories}
              selectedCategory={addGameForm.genres}
              onChange={handleAddFormChange}
            />
            <Box display="flex" justifyContent="space-between">
              {gameData ? <Button onClick={handleEditGame}>Edit</Button> : <Button onClick={handleAddGame}>Add</Button>}
              <Button onClick={handleClose}>Discard</Button>
            </Box>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box sx={{ maxWidth: { sm: '300px' }, margin: 'auto' }}>
            <ProductCard
              name={addGameForm.name}
              metascore={addGameForm.metaScore}
              image_url={addGameForm.imageUrl}
              price={addGameForm.price}
              platforms={addGameForm.platforms.join(' ')}
              genres={addGameForm.genres.join(' ')}
            />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};
