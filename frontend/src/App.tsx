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
import ProductPage from "./pages/ProductPage";

import "./styles/variables.css";
import "./styles/global.css";
import { useState } from "react";

const Navigation = ({ onSearch }: { onSearch: (q: string) => void }) => {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"];
  if (hideNavbar.includes(location.pathname)) {
    return null;
  }
  return <Navbar onSearch={onSearch} />;
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Navigation onSearch={setSearchQuery} />

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />

          <Route path="/product/:id" element={<ProductPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
