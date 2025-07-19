## Decisiones de diseño

### 1. Base de datos: SQLite
- Se eligió SQLite por su facilidad de uso, portabilidad y porque no requiere instalación adicional.
- Ideal para pruebas técnicas rápidas o prototipos.

### 2. Framework backend: FastAPI
- Por su velocidad, documentación automática y soporte para tipado fuerte con Pydantic.
- Facilita el desarrollo modular y limpio de APIs RESTful.

### 3. Estructura del código
- Separación clara de responsabilidades:
  - `models.py`: definición de tablas
  - `schemas.py`: validaciones y serialización
  - `crud.py`: lógica de acceso a datos
  - `main.py`: definición de endpoints

### 4. Validaciones implementadas
- No se permiten cantidades negativas.
- No se permiten fechas de vencimiento pasadas para entradas.
- Las salidas solo se realizan si hay stock suficiente y se descuentan según fechas más cercanas a vencer (FIFO).

### 5. Lógica de estado
- Cada producto se clasifica dinámicamente según:
  - **Vigente**: Fecha de caducidad > hoy + 3
  - **Por vencer**: Dentro de los próximos 3 días
  - **Vencido**: Caducado

---

#Posibles mejoras futuras

1. Agregar autenticación y permisos por rol.
2. Incluir pruebas unitarias con Pytest.
3. Exportación de inventario en CSV/Excel.
4. Control más detallado de lotes o ubicaciones por almacén.
5. Paginar resultados y permitir búsquedas con filtros.

---

## Autor

Castelblack — desarrollador Python y Oracle con enfoque limpio y ágil
