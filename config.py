import os
import datetime
import pathlib
from src.models import db

PATH = pathlib.Path(__file__)

SECRET_KEY = os.getenv('OSL_SECRET_KEY')

#SQLALCHEMY_DATABASE_URI = 'sqlite:///../database/site.db'
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL').replace('postgres', 'postgresql')
SQLALCHEMY_TRACK_MODIFICATIONS = False

SESSION_TYPE = 'sqlalchemy'
SESSION_SQLALCHEMY = db
PERMANENT_SESSION_LIFETIME = datetime.timedelta(days=7)
REMEMBER_COOKIE_DURATION=datetime.timedelta(days=7)
REMEMBER_COOKIE_HTTPONLY=True

STATIC_FOLDER = 'static'
