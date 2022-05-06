from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy import Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey

from . import Base

user_saves_table = Table(
    'user_saves',
    Base.metadata,
    Column('user saver', ForeignKey('users.id')),
    Column('saved article', ForeignKey('articles.id'))
)

user_likes_table = Table(
    'user_likes',
    Base.metadata,
    Column('user saver', ForeignKey('users.id')),
    Column('saved article', ForeignKey('articles.id'))
)

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False, unique=True)
    email = Column(String(50), nullable=False, unique=True)
    password = Column(String(), nullable=False, unique=True)
    role = Column(Integer, ForeignKey('roles.id'), default=2)
    saves = relationship(
            'ArticleCard',
            secondary=user_saves_table,
            back_populates='savers')
    likes = relationship(
            'ArticleCard',
            secondary=user_likes_table,
            back_populates='likers')

class Role(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), unique=True)
    booking_access = Column(Boolean(), default=True)
    posting_access = Column(Boolean(), default=False)
    admin_access = Column(Boolean(), default=False)


