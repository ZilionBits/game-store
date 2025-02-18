import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const PlatformsFilter = ({ platforms, selectedPlatform, onChange }) => {
  return (
    <Box sx={{ minWidth: '150px', margin: '10px' }}>
      <FormControl fullWidth>
        <InputLabel id="plat-label">Platform</InputLabel>
        <Select
          id="plat-select"
          value={selectedPlatform}
          label="Platform"
          name="platforms"
          labelId="plat-label"
          multiple={Array.isArray(selectedPlatform)}
          onChange={onChange}
        >
          <MenuItem value={''}>None</MenuItem>
          {[...platforms].map((plat) => (
            <MenuItem key={plat} value={plat}>
              {plat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
