from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.sql.schema import ForeignKey

from . import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False, unique=True)
    email = Column(String(50), nullable=False, unique=True)
    password = Column(String(), nullable=False, unique=True)
    role = Column(Integer, ForeignKey('roles.id'), default=2)

class Role(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), unique=True)
    booking_access = Column(Boolean(), default=True)
    posting_access = Column(Boolean(), default=False)
    admin_access = Column(Boolean(), default=False)

