import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";

import "./styles/variables.css";
import "./styles/global.css";
import { use } from "react";

const Navigation = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"];
  if (hideNavbar.includes(location.pathname)) {
    return null;
  }
  return <Navbar />;
};

function App() {
  return (
    <Router>
      <Navigation />

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
