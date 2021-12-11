from src.models import db
from datetime import timedelta

SQLALCHEMY_DATABASE_URI = 'sqlite:///../database/site.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SESSION_TYPE = 'sqlalchemy'
SESSION_SQLALCHEMY = db
PERMANENT_SESSION_LIFETIME = timedelta(days=7)
SECRET_KEY = 'dev_key'
SECURITY_PASSWORD_SALT = 'sault'
SESSION_COOKIE_HTTPONLY=True
REMEMBER_COOKIE_HTTPONLY=True
REMEMBER_COOKIE_DURATION=timedelta(days=7)