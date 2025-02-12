import { Box, FormControl, TextField } from '@mui/material';

export const NameFilter = ({ onChange }) => {
  return (
    <Box sx={{ minWidth: '150px', margin: '10px' }}>
      <FormControl fullWidth>
        <TextField id="name-text" label="Name" onChange={onChange}></TextField>
      </FormControl>
    </Box>
  );
};
