import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

      // Redirigir al inventario
      navigate("/inventario");
    } catch (err) {
      alert(err.response?.data?.detail || "Error al crear producto");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Crear Producto</h2>
      <div style={styles.formGroup}>
        <label>Nombre:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div style={styles.formGroup}>
        <label>Descripción:</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div style={styles.formGroup}>
        <label>Categoría:</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>

      <div style={styles.formGroup}>
        <label>Precio:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>

      <button style={styles.button} onClick={createProduct}>
        Crear Producto
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  formGroup: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  button: {
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    backgroundColor: "#282c34",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};