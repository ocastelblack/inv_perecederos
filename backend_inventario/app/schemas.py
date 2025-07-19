from pydantic import BaseModel
from datetime import date

class ProductCreate(BaseModel):
    name: str
    description: str | None = None

class Product(ProductCreate):
    id: int

    class Config:
        orm_mode = True

class EntryCreate(BaseModel):
    product_id: int
    quantity: int
    expiration_date: date

class ExitCreate(BaseModel):
    product_id: int
    quantity: int
