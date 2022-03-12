import datetime
from api.models import db
from os import getenv

SECRET_KEY = getenv('OSL_SECRET_KEY')
STATIC_FOLDER = 'static'
SQLALCHEMY_DATABASE_URI = getenv('DATABASE_URL').replace('postgres', 'postgresql')
SQLALCHEMY_TRACK_MODIFICATIONS = False
SESSION_TYPE = 'sqlalchemy'
SESSION_SQLALCHEMY = db
PERMANENT_SESSION_LIFETIME = datetime.timedelta(days=90)
REMEMBER_COOKIE_DURATION=datetime.timedelta(days=1)
SESSION_COOKIE_SECURE=False
REMEMBER_COOKIE_HTTPONLY=True
SESSION_COOKIE_SAMESITE = 'None'
SESSION_COOKIE_NAME = 'osl-apiv1-session'
