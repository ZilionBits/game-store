import { createTheme, CssBaseline, ThemeProvider, useTheme } from '@mui/material';

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: {
          main: '#ff9800',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#03a9f4',
          contrastText: '#ffffff',
        },
        background: {
          default: '#f5f7fa',
          paper: '#ffffff',
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#ff5722',
          contrastText: '#000000',
        },
        secondary: {
          main: '#4caf50',
          contrastText: '#000000',
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '12px 24px',
          fontWeight: 700,
          textTransform: 'uppercase',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          '--AppBar-background': '#ffffff',
          '--AppBar-color': '#000000',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          backgroundImage:
            themeParam.palette.mode === 'light'
              ? 'linear-gradient(to bottom, #f5f7fa, #c3cfe2)'
              : 'linear-gradient(to bottom, #121212, #3b3b3b)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          margin: 0,
          minHeight: '100vh',
        },
      }),
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          justifyContent: 'space-between',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        avatar: {
          margin: '8px',
          padding: '3px',
          border: '1px solid',
          borderRadius: '50%',
        },
        title: {
          fontSize: '1rem',
        },
        subheader: {
          fontSize: '0.75rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          height: '150px',
          justifyContent: 'space-between',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'space-between',
          '& .MuiButtonBase-root': {
            fontSize: '0.75rem',
            padding: '5px',
          },
        },
      },
    },
  },
});

export const CustomTheme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme /> {children}
    </ThemeProvider>
  );
};
