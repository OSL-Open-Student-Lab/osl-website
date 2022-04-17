from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from api.v1.config import*

engine = create_engine(SQLALCHEMY_DATABASE_URL)
Base = declarative_base()
Session = sessionmaker(bind=engine, autocommit=False, autoflush=False)

