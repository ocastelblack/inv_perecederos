// === src/components/InventoryEntryForm.jsx ===
import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function InventoryEntryForm() {
  const [products, setProducts] = useState([]);
  const [entry, setEntry] = useState({
    product_id: "",
    quantity: "",
    expiration_date: "",
  });

  useEffect(() => {
    axios.get(`${API}/inventory`).then((res) => setProducts(res.data));
  }, []);

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const submitEntry = async () => {
    try {
      await axios.post(`${API}/inventory/entry`, {
        ...entry,
        product_id: parseInt(entry.product_id),
        quantity: parseInt(entry.quantity),
      });
      alert("Entrada registrada");
      setEntry({ product_id: "", quantity: "", expiration_date: "" });
    } catch (err) {
      alert(err.response?.data?.detail || "Error en entrada");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Registrar Entrada</h2>
        <label>Producto:</label>
        <select
          name="product_id"
          value={entry.product_id}
          onChange={handleChange}
        >
          <option value="">Seleccione un producto</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <label>Cantidad:</label>
        <input
          name="quantity"
          type="number"
          value={entry.quantity}
          onChange={handleChange}
        />

        <label>Fecha de Caducidad:</label>
        <input
          name="expiration_date"
          type="date"
          value={entry.expiration_date}
          onChange={handleChange}
        />

        <button onClick={submitEntry}>Registrar Entrada</button>
      </div>
    </div>
  );
}