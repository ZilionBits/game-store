import { BrowserRouter, Route, Routes } from 'react-router';
import { NavigationBar } from './components/navigation-bar/NavigationBar';
import { Homepage } from './components/homepage/Homepage';
import { SignIn } from './components/sign-in/SignIn';
import { SignUp } from './components/sign-up/SignUp';
import { ProductListPage } from './components/product-list-page/ProductList';
import { ProfilePage } from './components/profile-page/ProfilePage';
import { SettingsPage } from './components/settings-page/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavigationBar />}>
          <Route index element={<Homepage />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="store" element={<ProductListPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
