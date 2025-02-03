import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CustomTheme } from './styles/CustomTheme.jsx';
import AppContext from './components/global-context/AppContext.jsx';
import { UserAuth } from './components/authorization/UserAuth.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuth>
      <AppContext>
        <CustomTheme noSsr>
          <App />
        </CustomTheme>
      </AppContext>
    </UserAuth>
  </StrictMode>,
);
