from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.sql.schema import ForeignKey

from . import Base

class ArticleCard(Base):
    __tablename__ = 'articles'

    id = Column(Integer, primary_key=True, autoincrement=True)
    header = Column(String(250), nullable=False)
    text = Column(Text(), nullable=False)
    data = Column(String(50), nullable=False)
    likes = Column(Integer, nullable=True)
    saves = Column(Integer, nullable=True)
    author = Column(Integer, ForeignKey('users.id'), nullable=False)
