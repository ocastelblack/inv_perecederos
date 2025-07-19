import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function InventoryList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${API}/inventory`)
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data); // Inicialmente mostramos todos
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const results = products.filter(p =>
      p.name.toLowerCase().includes(value)
    );
    setFiltered(results);
  };

  return (
    <div className="container">
      <h2>Inventario General</h2>

      <input
        type="text"
        placeholder="Buscar producto por nombre"
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
      />

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Vigente</th>
            <th>Por Vencer</th>
            <th>Vencido</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description || "-"}</td>
              <td>{product.category || "-"}</td>
              <td>${product.price?.toFixed(2) || "-"}</td>
              <td>{product.inventario.vigente}</td>
              <td>{product.inventario.por_vencer}</td>
              <td>{product.inventario.vencido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}