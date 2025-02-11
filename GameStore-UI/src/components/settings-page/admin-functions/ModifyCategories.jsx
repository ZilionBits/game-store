import { Alert, Box, Button, Grid2, Stack, Typography } from '@mui/material';
import { CategoriesFilter } from '../../product-list-page/CategoriesFilter';
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../global-context/AppContext';
import { CategoryPop } from './CategoryPop';

export const ModifyCategories = ({ handleClose }) => {
  const { gamesData, removeGenre } = useContext(GlobalContext);
  const [categories, setCategories] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [response, setResponse] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCatRevPopClick = (event) => {
    setAnchorEl(event.currentTarget);
    handleCategoryRemove();
    setTimeout(() => {
      handleCatRevPopClose();
      setSelectedCategory('');
      handleClose();
    }, 2000);
  };

  const handleCatRevPopClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCategoryRemove = async () => {
    try {
      const response = await removeGenre(selectedCategory);
      setResponse(response);
      console.log(response);
    } catch (error) {
      setResponse(error.response);
      console.log(response);
    }
  };

  useEffect(() => {
    const filterCategories = [...new Set(gamesData.flatMap((game) => game.genres.map((genre) => genre.name)))];
    setCategories(filterCategories);
  }, [gamesData]);

  return (
    <Box>
      <Alert sx={{ marginBottom: '10px' }} severity="warning">
        After removing a category that is in use, you will be unable to find that game by the removed category name.
      </Alert>
      <Alert sx={{ marginBottom: '10px' }} severity="warning">
        A game can be left without any category.
      </Alert>
      <Grid2 container justifyContent={'center'}>
        <Grid2 size={6}>
          <CategoriesFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onChange={handleCategoryChange}
          />
        </Grid2>
        <Grid2 size={6}>
          <Stack textAlign={'end'}>
            <Typography variant="overline">Selected category:</Typography>
            <Typography color="warning">{selectedCategory ? `${selectedCategory}` : 'Select category'}</Typography>
            {selectedCategory && (
              <>
                <Typography variant="overline">Are you sure about removing selected category?</Typography>
                <Box justifyContent={'space-between'} display={'flex'}>
                  <Button onClick={handleCatRevPopClick}>Yes</Button>
                  <Button
                    onClick={() => {
                      setSelectedCategory('');
                      handleClose();
                    }}
                  >
                    No
                  </Button>
                </Box>
              </>
            )}

            <CategoryPop
              anchorEl={anchorEl}
              handleClose={handleCatRevPopClose}
              response={response}
              category={selectedCategory}
            />
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  );
};
