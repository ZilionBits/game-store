import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  Input,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';
import { CategoriesFilter } from '../../product-list-page/CategoriesFilter';
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../global-context/AppContext';
import { CategoryPop } from './CategoryPop';

export const ModifyCategories = ({ handleClose }) => {
  const { genresData, removeGenre, addGenre } = useContext(GlobalContext);
  const [categories, setCategories] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inputCategory, setInputCategory] = useState('');
  const [removeResponse, setRemoveResponse] = useState(null);
  const [addResponse, setAddResponse] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [addAnchorEl, setAddAnchorEl] = useState();
  const [catAddError, setCatAddError] = useState(null);

  const handleCatRevPopClick = (event) => {
    setAnchorEl(event.currentTarget);
    handleCategoryRemove();
    setTimeout(() => {
      handleCatRevPopClose();
      setSelectedCategory('');
      setRemoveResponse(null);
      handleClose();
    }, 2000);
  };

  const handleCatRevPopClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCatAddPopClick = (event) => {
    setAddAnchorEl(event.currentTarget);
    handleCategoryAdd();
    setTimeout(() => {
      handleCatAddPopClose();
      setInputCategory('');
      setAddResponse(null);
      handleClose();
    }, 2000);
  };

  const handleCatAddPopClose = () => {
    setAddAnchorEl(null);
  };

  const handleCatAddChange = (e) => {
    setInputCategory(e.target.value);

    if (e.target.value.length < 3 && e.target.value.length >= 1) {
      setCatAddError('Category must have at least 3 characters.');
    } else {
      setCatAddError(null);
    }
  };

  const handleCategoryRemove = async () => {
    try {
      const response = await removeGenre(selectedCategory);
      setRemoveResponse(response);
    } catch (error) {
      setRemoveResponse(error.response);
    }
  };

  const handleCategoryAdd = async () => {
    try {
      const response = await addGenre(inputCategory);
      setAddResponse(response);
    } catch (error) {
      setAddResponse(error.response);
    }
  };

  useEffect(() => {
    const filterCategories = [...new Set(genresData.map((genre) => genre.name))];
    setCategories(filterCategories);
  }, [genresData]);

  return (
    <Box>
      <Alert sx={{ marginBottom: '10px' }} severity="warning">
        After removing a category that is in use, you will be unable to find that game by the removed category name.
      </Alert>
      <Alert sx={{ marginBottom: '10px' }} severity="warning">
        A game can be left without any category.
      </Alert>
      <Typography variant="h4" color="info" textAlign={'center'}>
        Delete category
      </Typography>
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
              response={removeResponse}
              category={selectedCategory}
            />
          </Stack>
        </Grid2>
      </Grid2>
      <Typography variant="h4" color="info" textAlign={'center'}>
        Add category
      </Typography>
      <Grid2 container justifyContent={'center'}>
        <Grid2 size={6}>
          <Box sx={{ minWidth: '150px', margin: '10px' }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="add-genre">Category</InputLabel>
              <Input id="add-genre" type="text" value={inputCategory} onChange={handleCatAddChange} />
              <FormHelperText error={Boolean(catAddError)}>{catAddError}</FormHelperText>
            </FormControl>
          </Box>
        </Grid2>
        <Grid2 size={6}>
          <Stack textAlign={'end'}>
            <Typography variant="overline">Creating category:</Typography>
            <Typography color="warning">{inputCategory ? `${inputCategory}` : 'Category not given'}</Typography>
            {inputCategory && (
              <>
                <Typography variant="overline">Are you sure about adding the inputted category?</Typography>
                <Box justifyContent={'space-between'} display={'flex'}>
                  <Button disabled={Boolean(catAddError)} onClick={handleCatAddPopClick}>Yes</Button>
                  <Button
                    onClick={() => {
                      setInputCategory('');
                      handleClose();
                    }}
                  >
                    No
                  </Button>
                </Box>
              </>
            )}

            <CategoryPop
              anchorEl={addAnchorEl}
              handleClose={handleCatAddPopClose}
              response={addResponse}
              category={inputCategory}
            />
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  );
};
