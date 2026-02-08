import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";

import "./styles/global.css";
import "./styles/variables.css";

function App() {
  return (
    <Router>
      <Navbar />

      <main className="main-content">
        <Routes>
          {" "}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
