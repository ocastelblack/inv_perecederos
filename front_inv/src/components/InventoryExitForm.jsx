import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function InventoryExitForm() {
  const [form, setForm] = useState({ product_id: "", quantity: "" });

  const createExit = async () => {
    const payload = {
      product_id: parseInt(form.product_id),
      quantity: parseInt(form.quantity),
    };
    if (payload.quantity > 0) {
      await axios.post(`${API}/inventory/exit`, payload);
      setForm({ product_id: "", quantity: "" });
      alert("Salida registrada");
    }
  };

  return (
    <div>
      <label>ID Producto:</label>
      <input value={form.product_id} onChange={(e) => setForm({ ...form, product_id: e.target.value })} />
      <label>Cantidad:</label>
      <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
      <button onClick={createExit}>Registrar Salida</button>
    </div>
  );
}