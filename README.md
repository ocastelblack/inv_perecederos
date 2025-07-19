# Inventario de Productos Perecederos

Sistema de gestión de inventario para productos perecederos desarrollado como prueba técnica. Permite crear productos, registrar entradas y salidas de inventario, y consultar el estado de los productos según su fecha de caducidad.

---

## Tecnologías usadas

- **Python 3.11+**
- **FastAPI** - Backend API
- **SQLite** - Base de datos embebida
- **SQLAlchemy** - ORM
- **Pydantic** - Validación de datos

---

### Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
### Instalar dependencias
pip install -r requirements.txt

### Ejecutar el servidor
uvicorn app.main:app --reload

### Probar la API
http://127.0.0.1:8000/docs

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/inventario-perecederos.git
cd inventario-perecederos/backend
