import { styled, Switch } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useColorScheme } from '@mui/material';

const DayNightSwitch = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const handleSwitchState = (event) => {
    const isDarkMode = event.target.checked;
    setMode(isDarkMode ? 'dark' : 'light');
  };

  const CustomDarkModeIcon = styled(DarkMode)({
    position: 'relative',
    fontSize: '2rem',
    bottom: '5.6px',
  });

  const CustomLightModeIcon = styled(LightMode)({
    position: 'relative',
    fontSize: '2rem',
    fill: '#ff9800',
    bottom: '5.6px',
    right: '6px',
  });

  return (
    <Switch
      checked={mode === 'dark'}
      checkedIcon={<CustomDarkModeIcon />}
      icon={<CustomLightModeIcon />}
      onChange={handleSwitchState}
      sx={{
        '& .MuiSwitch-track': {
          opacity: '0.15',
        },
      }}
    />
  );
};

export default DayNightSwitch;
