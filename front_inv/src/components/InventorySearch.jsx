import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function InventorySearch() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const buscar = async () => {
    try {
      const res = await axios.get(`${API}/products/search?q=${search}`);
      setResult(res.data);
    } catch {
      alert("Error al buscar producto");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Buscar Productos</h2>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Nombre del producto"
        />
        <button onClick={buscar}>Buscar</button>

        <ul>
          {result.length > 0 ? (
            result.map((r) => (
              <li key={r.id}>
                <strong>{r.name}</strong> — {r.description || "Sin descripción"}
              </li>
            ))
          ) : (
            <p>No se encontraron resultados</p>
          )}
        </ul>
      </div>
    </div>
  );
}