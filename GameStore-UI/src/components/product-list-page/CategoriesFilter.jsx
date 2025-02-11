import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const CategoriesFilter = ({ categories, selectedCategory, onChange }) => {

  return (
    <Box sx={{ minWidth: '150px', margin:'10px' }}>
      <FormControl fullWidth>
        <InputLabel id="cat-label">Category</InputLabel>
        <Select id="cat-select" value={selectedCategory} label="Category" labelId="cat-label" onChange={onChange}>
            <MenuItem value={''}>None</MenuItem>
          {[...categories].map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
