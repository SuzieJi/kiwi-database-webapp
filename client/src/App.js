import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { indigo, amber } from '@mui/material/colors'
import { createTheme } from "@mui/material/styles";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ParkingLotPage from "./pages/ParkingLotPage";
import RestaurantList from "./pages/RestaurantList";
import Michelin from "./pages/Michelin";
import RestaurantDetails from "./pages/RestaurantDetails";
import HotelPage from "./pages/HotelPage";
// createTheme enables you to customize the look and feel of your app past the default
// in this case, we only change the color scheme
export const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBarWithConditionalRender />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/parkinglot" element={<ParkingLotPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/restaurants/:cuisine" element={<RestaurantList />} />
          <Route path="/michelin" element={<Michelin />} />
          <Route path="/restaurant-details/:id" element={<RestaurantDetails />} />
          <Route path="/hotel" element={<HotelPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function NavBarWithConditionalRender() {
  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/' || location.pathname === '/users') {
    return null;
  }
  return <NavBar />;
}

export default App;