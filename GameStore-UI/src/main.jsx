import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CustomTheme } from './styles/CustomTheme.jsx';
import AppContext from './components/global-context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContext>
      <CustomTheme noSsr>
        <App />
      </CustomTheme>
    </AppContext>
  </StrictMode>,
);
