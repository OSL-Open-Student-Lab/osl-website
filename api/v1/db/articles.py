from email.policy import default
from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey

from . import Base
from .user import user_saves_table, user_likes_table

class ArticleCard(Base):
    __tablename__ = 'articles'

    id = Column(Integer, primary_key=True, autoincrement=True)
    header = Column(String(250), nullable=False)
    text = Column(Text(), nullable=False)
    likes_number = Column(Integer, nullable=True, default=0)
    saves_number = Column(Integer, nullable=True, default=0)
    author = Column(Integer, ForeignKey('users.id'), nullable=False)
    savers = relationship(
            'User',
            secondary=user_saves_table,
            back_populates='saves')
    likers = relationship(
            'User',
            secondary=user_likes_table,
            back_populates='likes')

