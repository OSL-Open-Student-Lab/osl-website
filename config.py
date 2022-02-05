import os
import datetime

from src.models import db

SECRET_KEY = 'dev_key'

SQLALCHEMY_DATABASE_URI = 'sqlite:///../database/site.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False

SESSION_TYPE = 'sqlalchemy'
SESSION_SQLALCHEMY = db
PERMANENT_SESSION_LIFETIME = datetime.timedelta(days=7)
REMEMBER_COOKIE_DURATION=datetime.timedelta(days=7)
REMEMBER_COOKIE_HTTPONLY=True
