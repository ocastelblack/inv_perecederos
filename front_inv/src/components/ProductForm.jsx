import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css"; // NUEVO: agrega este archivo con los estilos base

const API = "http://localhost:8000";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const createProduct = async () => {
    if (!name.trim()) return alert("Nombre requerido");
    if (price < 0 || isNaN(price)) return alert("Precio debe ser válido");

    try {
      await axios.post(`${API}/products`, {
        name,
        description,
        category,
        price: parseFloat(price),
      });

      alert("Producto creado con éxito");
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");

      navigate("/inventario");
    } catch (err) {
      alert(err.response?.data?.detail || "Error al crear producto");
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Producto</h2>

      <div className="form-group">
        <label>Nombre:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Descripción:</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Categoría:</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Precio:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>

      <button onClick={createProduct}>Crear Producto</button>
    </div>
  );
}