import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function InventoryList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/inventory`).then((res) => setProducts(res.data));
  }, []);

  return (
    <div style={styles.container}>
      <h2>Estado General del Inventario</h2>
      <table style={styles.table}>
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
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

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
    backgroundColor: "#fff",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#282c34",
    color: "#fff",
    padding: "0.5rem",
  },
  td: {
    padding: "0.5rem",
    borderBottom: "1px solid #ccc",
  },
};