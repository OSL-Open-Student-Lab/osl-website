import datetime
import os

from api.models import db

# SECRET_KEY = os.getenv('OSL_KEY')
SECRET_KEY = 'dev'

STATIC_FOLDER = 'static'

# SQLALCHEMY_DATABASE_URI = os.getenv('OSL_DATABASE')
SQLALCHEMY_DATABASE_URI = 'postgresql://timaracov:devpas@localhost:5432/osl'
SQLALCHEMY_TRACK_MODIFICATIONS = False

SESSION_SQLALCHEMY = db
SESSION_TYPE = 'sqlalchemy'
SESSION_COOKIE_SAMESITE = "Strict"
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = False
SESSION_COOKIE_NAME = 'osl-apiv1-session'

PERMANENT_SESSION_LIFETIME = datetime.timedelta(hours=12)
REMEMBER_COOKIE_DURATION = datetime.timedelta(days=90)
