import datetime
from api.models import db

SECRET_KEY = 'development key'
SQLALCHEMY_DATABASE_URI = 'sqlite:///../database/site.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SESSION_TYPE = 'sqlalchemy'
SESSION_SQLALCHEMY = db
PERMANENT_SESSION_LIFETIME = datetime.timedelta(days=7)
REMEMBER_COOKIE_DURATION=datetime.timedelta(days=7)
REMEMBER_COOKIE_HTTPONLY=True
STATIC_FOLDER = 'static'
