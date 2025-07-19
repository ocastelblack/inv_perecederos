import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Productos from "./pages/Productos";
import Entradas from "./pages/Entradas";
import Salidas from "./pages/Salidas";
import Inventario from "./pages/Inventario";
import Buscar from "./pages/Buscar";

function App() {
  return (
    <Router>
      <nav style={navStyle}>
        {[
          { to: "/productos", label: "Productos" },
          { to: "/entradas", label: "Entradas" },
          { to: "/salidas", label: "Salidas" },
          { to: "/inventario", label: "Inventario" },
          { to: "/buscar", label: "Buscar" },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={mainStyle}>
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

// Estilos en JS puro
const navStyle = {
  padding: "1rem",
  backgroundColor: "#111",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
  boxShadow: "0 2px 5px rgba(0,0,0,0.5)",
  position: "sticky",
  top: 0,
  zIndex: 10,
};

const linkStyle = {
  color: "#ddd",
  textDecoration: "none",
  fontWeight: "bold",
  paddingBottom: "4px",
  borderBottom: "2px solid transparent",
  transition: "all 0.3s ease",
};

const activeLinkStyle = {
  color: "#ffcc00",
  borderBottom: "2px solid #ffcc00",
};

const mainStyle = {
  padding: "2rem",
  maxWidth: "1000px",
  margin: "0 auto",
};

export default App;