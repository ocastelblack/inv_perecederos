from sqlalchemy.orm import Session
from datetime import date, timedelta
from . import models, schemas

# Crear producto

def create_product(db: Session, product: schemas.ProductCreate):
    if not product.name.strip():
        raise ValueError("El nombre del producto es obligatorio.")

    db_product = models.Product(
        name=product.name.strip(),
        description=product.description.strip(),
        category=product.category.strip() if product.category else None,
        price=product.price if product.price is not None else 0.0
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

# Editar producto

def update_product(db: Session, product_id: int, update_data: schemas.ProductUpdate):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise ValueError("Producto no encontrado")

    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(db_product, field, value)

    db.commit()
    db.refresh(db_product)
    return db_product

# Eliminar producto (solo si no tiene inventario activo)

def delete_product(db: Session, product_id: int):
    entradas_activas = db.query(models.InventoryEntry).filter(
        models.InventoryEntry.product_id == product_id,
        models.InventoryEntry.quantity > 0
    ).count()

    if entradas_activas > 0:
        raise ValueError("No se puede eliminar un producto con inventario activo.")

    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise ValueError("Producto no encontrado")

    db.delete(db_product)
    db.commit()
    return {"message": "Producto eliminado exitosamente"}

# Crear entrada

def create_inventory_entry(db: Session, entry: schemas.EntryCreate):
    if entry.quantity <= 0 or entry.expiration_date < date.today():
        raise ValueError("Cantidad debe ser > 0 y fecha válida.")

    product_exists = db.query(models.Product).filter(models.Product.id == entry.product_id).first()
    if not product_exists:
        raise ValueError("Producto no existente")

    db_entry = models.InventoryEntry(
        product_id=entry.product_id,
        quantity=entry.quantity,
        expiration_date=entry.expiration_date
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

# Crear salida

def create_inventory_exit(db: Session, exit: schemas.ExitCreate):
    entries = db.query(models.InventoryEntry)\
                .filter(models.InventoryEntry.product_id == exit.product_id)\
                .filter(models.InventoryEntry.expiration_date >= date.today())\
                .order_by(models.InventoryEntry.expiration_date)\
                .all()

    cantidad_solicitada = exit.quantity
    if cantidad_solicitada <= 0:
        raise ValueError("Cantidad debe ser mayor a cero.")

    total_disponible = sum(e.quantity for e in entries)
    if total_disponible < cantidad_solicitada:
        raise ValueError("No hay suficiente inventario disponible.")

    for entry in entries:
        if cantidad_solicitada == 0:
            break
        disponible = entry.quantity
        to_remove = min(disponible, cantidad_solicitada)
        entry.quantity -= to_remove
        cantidad_solicitada -= to_remove

    db_exit = models.InventoryExit(
        product_id=exit.product_id,
        quantity=exit.quantity
    )
    db.add(db_exit)
    db.commit()
    return db_exit

# Listar productos con cantidades agrupadas por estado

def get_inventory_status(db: Session):
    products = db.query(models.Product).all()
    resultado = []

    for product in products:
        entradas = db.query(models.InventoryEntry)\
                     .filter(models.InventoryEntry.product_id == product.id)\
                     .filter(models.InventoryEntry.quantity > 0)\
                     .all()

        estados = {"vigente": 0, "por_vencer": 0, "vencido": 0}

        for e in entradas:
            if e.expiration_date < date.today():
                estados["vencido"] += e.quantity
            elif e.expiration_date <= date.today() + timedelta(days=3):
                estados["por_vencer"] += e.quantity
            else:
                estados["vigente"] += e.quantity

        resultado.append({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "category": product.category,
            "price": product.price,
            "inventario": estados
        })

    return resultado

# Obtener detalle de inventario por producto

def get_product_inventory(db: Session, product_id: int):
    entradas = db.query(models.InventoryEntry)\
                 .filter(models.InventoryEntry.product_id == product_id)\
                 .filter(models.InventoryEntry.quantity > 0)\
                 .order_by(models.InventoryEntry.expiration_date)\
                 .all()

    detalle = []
    for e in entradas:
        if e.expiration_date < date.today():
            estado = "vencido"
        elif e.expiration_date <= date.today() + timedelta(days=3):
            estado = "por_vencer"
        else:
            estado = "vigente"

        detalle.append({
            "cantidad": e.quantity,
            "vencimiento": e.expiration_date,
            "estado": estado
        })

    return detalle