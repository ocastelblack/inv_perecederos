import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function InventoryList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/inventory`).then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2>Estado General del Inventario</h2>
      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: "1rem" }}>
          <strong>{product.name}</strong> — {product.description}
          <ul>
            {Object.entries(product.inventario).map(([estado, cantidad]) => (
              <li key={estado}>
                {estado}: {cantidad}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}