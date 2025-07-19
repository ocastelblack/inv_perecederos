from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

# ---------- PRODUCTOS ----------

class ProductBase(BaseModel):
    name: str = Field(..., min_length=1)
    description: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = Field(ge=0)

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    category: Optional[str]
    price: Optional[float] = Field(ge=0)

class Product(ProductBase):
    id: int

    class Config:
        orm_mode = True

# ---------- INVENTARIO ----------

class EntryCreate(BaseModel):
    product_id: int
    quantity: int = Field(..., gt=0)
    expiration_date: date

class ExitCreate(BaseModel):
    product_id: int
    quantity: int = Field(..., gt=0)
