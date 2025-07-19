import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function InventoryEntryForm() {
  const [form, setForm] = useState({ product_id: "", quantity: "", expiration_date: "" });

  const createEntry = async () => {
    const payload = {
      product_id: parseInt(form.product_id),
      quantity: parseInt(form.quantity),
      expiration_date: form.expiration_date,
    };
    if (payload.quantity > 0) {
      await axios.post(`${API}/inventory/entry`, payload);
      setForm({ product_id: "", quantity: "", expiration_date: "" });
      alert("Entrada registrada");
    }
  };

  return (
    <div>
      <label>ID Producto:</label>
      <input value={form.product_id} onChange={(e) => setForm({ ...form, product_id: e.target.value })} />
      <label>Cantidad:</label>
      <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
      <label>Fecha de Vencimiento:</label>
      <input type="date" value={form.expiration_date} onChange={(e) => setForm({ ...form, expiration_date: e.target.value })} />
      <button onClick={createEntry}>Registrar Entrada</button>
    </div>
  );
}