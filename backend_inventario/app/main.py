from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from . import models, schemas, crud
from .database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inventario de Perecederos")

# Permitir CORS (útil para conectar con frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependencia para obtener DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "API de Inventario Perecederos OK"}

# 1. Crear producto
@app.post("/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db, product)

# 2. Crear entrada
@app.post("/inventory/entry")
def create_entry(entry: schemas.EntryCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_inventory_entry(db, entry)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# 3. Crear salida
@app.post("/inventory/exit")
def create_exit(exit: schemas.ExitCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_inventory_exit(db, exit)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# 4. Listar productos con estados
@app.get("/inventory")
def get_inventory(db: Session = Depends(get_db)):
    return crud.get_inventory_status(db)

# 5. Detalle de inventario por producto
@app.get("/inventory/{product_id}")
def get_product_detail(product_id: int, db: Session = Depends(get_db)):
    return crud.get_product_inventory(db, product_id)

# Buscar producto por nombre
@app.get("/products/search")
def search_products(q: str, db: Session = Depends(get_db)):
    return crud.search_products(db, q)

# Editar producto
@app.put("/products/{product_id}")
def update_product(product_id: int, product: schemas.ProductUpdate, db: Session = Depends(get_db)):
    try:
        return crud.update_product(db, product_id, product)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# Eliminar producto
@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    try:
        return crud.delete_product(db, product_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
