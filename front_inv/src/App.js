import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Productos from "./pages/Productos";
import Entradas from "./pages/Entradas";
import Salidas from "./pages/Salidas";
import Inventario from "./pages/Inventario";
import Buscar from "./pages/Buscar";

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", backgroundColor: "#111", color: "#fff" }}>
        <Link to="/productos" style={linkStyle}>Productos</Link>
        <Link to="/entradas" style={linkStyle}>Entradas</Link>
        <Link to="/salidas" style={linkStyle}>Salidas</Link>
        <Link to="/inventario" style={linkStyle}>Inventario</Link>
        <Link to="/buscar" style={linkStyle}>Buscar</Link>
      </nav>

      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/productos" element={<Productos />} />
          <Route path="/entradas" element={<Entradas />} />
          <Route path="/salidas" element={<Salidas />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/buscar" element={<Buscar />} />
        </Routes>
      </div>
    </Router>
  );
}

const linkStyle = {
  marginRight: "1rem",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold"
};

export default App;