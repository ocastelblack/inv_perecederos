import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function InventorySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    if (!query.trim()) return;
    const res = await axios.get(`${API}/inventory/search?name=${query}`);
    setResults(res.data);
  };

  return (
    <div>
      <input placeholder="Nombre del producto" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={search}>Buscar</button>

      <ul>
        {results.map((item, index) => (
          <li key={index}>
            {item.estado}: {item.cantidad} (vence: {item.vencimiento})
          </li>
        ))}
      </ul>
    </div>
  );
}