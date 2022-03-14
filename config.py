import datetime
from api.models import db
from os import getenv

SECRET_KEY='dev'#getenv('OSL_SECRET_KEY')

STATIC_FOLDER='static'

SQLALCHEMY_DATABASE_URI='sqlite:///../database/osl.db' #getenv('DATABASE_URL').replace('postgres', 'postgresql')
SQLALCHEMY_TRACK_MODIFICATIONS=False

SESSION_SQLALCHEMY=db
SESSION_TYPE='sqlalchemy'
SESSION_COOKIE_SAMESITE="Strict"
SESSION_COOKIE_HTTPONLY=True
SESSION_COOKIE_SECURE=False
SESSION_COOKIE_NAME='osl-apiv1-session'

PERMANENT_SESSION_LIFETIME=datetime.timedelta(days=90)
REMEMBER_COOKIE_DURATION=datetime.timedelta(days=1)
