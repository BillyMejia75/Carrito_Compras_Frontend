import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./componentes/Navbar/NavBar";
import Home from "./pages/home";
import Footer from "./componentes/Footer";
import Carrito from "./componentes/carrito/Carrito";
import ProductosBuscados from "./componentes/ProductosBuscados";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route end path="/" element={<Home />} />
        <Route
          end
          path="/buscar/:categoriaId/:busqueda"
          element={<ProductosBuscados />}
        />
        <Route end path="/Carrito" element={<Carrito />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
