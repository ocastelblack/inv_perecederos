import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function InventorySearch() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const buscar = async () => {
    try {
      const res = await axios.get(`${API}/search?name=${search}`);
      setResult(res.data);
    } catch {
      alert("Producto no encontrado");
    }
  };

  return (
    <div>
      <h2>Buscar Productos</h2>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nombre del producto" />
      <button onClick={buscar}>Buscar</button>
      <ul>
        {result.map((r) => (
          <li key={r.id}>
            {r.name} - {r.description}
          </li>
        ))}
      </ul>
    </div>
  );
}