from pydantic import BaseModel
from typing import Union, Optional

class UsuarioBase(BaseModel):
    nombre: Optional[str] = "Sin nombre"
    edad: Optional[Union[int, str]] = 0

    class Config:
        extra = "allow"