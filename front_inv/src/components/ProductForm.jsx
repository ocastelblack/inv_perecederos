import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createProduct = async () => {
    if (!name.trim()) return;
    await axios.post(`${API}/products`, { name, description });
    setName("");
    setDescription("");
    alert("Producto creado con éxito");
  };

  return (
    <div>
      <label>Nombre:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Descripción:</label>
      <input value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={createProduct}>Crear Producto</button>
    </div>
  );
}