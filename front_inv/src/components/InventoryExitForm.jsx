import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function InventoryEntryForm() {
  const [entry, setEntry] = useState({ product_id: "", quantity: "", expiration_date: "" });

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
    <div>
      <h2>Agregar Entrada</h2>
      <input name="product_id" placeholder="ID Producto" value={entry.product_id} onChange={handleChange} />
      <input name="quantity" placeholder="Cantidad" value={entry.quantity} onChange={handleChange} />
      <input name="expiration_date" type="date" value={entry.expiration_date} onChange={handleChange} />
      <button onClick={submitEntry}>Registrar</button>
    </div>
  );
}