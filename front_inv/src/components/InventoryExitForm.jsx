import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function InventoryExitForm() {
  const [exit, setExit] = useState({ product_id: "", quantity: "" });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/inventory`)
      .then((res) => setProducts(res.data))
      .catch(() => alert("Error al cargar productos"));
  }, []);

  const handleChange = (e) => {
    setExit({ ...exit, [e.target.name]: e.target.value });
  };

  const submitExit = async () => {
    if (!exit.product_id || !exit.quantity) {
      return alert("Todos los campos son obligatorios");
    }

    try {
      await axios.post(`${API}/inventory/exit`, {
        product_id: parseInt(exit.product_id),
        quantity: parseInt(exit.quantity),
      });

      alert("Salida registrada correctamente");
      setExit({ product_id: "", quantity: "" });
    } catch (err) {
      alert(err.response?.data?.detail || "Error al registrar salida");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Registrar Salida</h2>

        <div className="form-group">
          <label>Producto:</label>
          <select
            name="product_id"
            value={exit.product_id}
            onChange={handleChange}
          >
            <option value="">Seleccione un producto</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.category || "Sin categoría"}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Cantidad:</label>
          <input
            name="quantity"
            type="number"
            min="1"
            value={exit.quantity}
            onChange={handleChange}
          />
        </div>

        <button onClick={submitExit}>Registrar Salida</button>
      </div>
    </div>
  );
}