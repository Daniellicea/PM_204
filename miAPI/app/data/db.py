from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# -------------------------------------------------------------------------
# OBTENER LA URL DE CONEXIÓN A LA BASE DE DATOS
# -------------------------------------------------------------------------

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://admin:123456@localhost:5434/DB_miapi"
)

# -------------------------------------------------------------------------
# CREACIÓN DEL ENGINE (MOTOR DE CONEXIÓN)
# -------------------------------------------------------------------------

engine = create_engine(DATABASE_URL)


# -------------------------------------------------------------------------
# CREACIÓN DEL FACTORY DE SESIONES
# -------------------------------------------------------------------------

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# -------------------------------------------------------------------------
# BASE DECLARATIVA PARA LOS MODELOS
# -------------------------------------------------------------------------

Base = declarative_base()


# -------------------------------------------------------------------------
# OBTENER SESIÓN DE BASE DE DATOS
# -------------------------------------------------------------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()