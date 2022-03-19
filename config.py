import datetime
from api.models import db

SECRET_KEY=b'[\x15C\xa7\x9f\x8b\xa0\xac)\xb5p\xc2\xc5\xd4\xc3\xb5\xbf\xf5&\xa6\xbfK\xdc\x91'

STATIC_FOLDER='static'

SQLALCHEMY_DATABASE_URI='postgresql://timaracov:devpas@localhost:5432/osl'#'sqlite:///../database/osl.db'
SQLALCHEMY_TRACK_MODIFICATIONS=False

SESSION_SQLALCHEMY=db
SESSION_TYPE='sqlalchemy'
SESSION_COOKIE_SAMESITE="Strict"
SESSION_COOKIE_HTTPONLY=True
SESSION_COOKIE_SECURE=False
SESSION_COOKIE_NAME='osl-apiv1-session'

PERMANENT_SESSION_LIFETIME=datetime.timedelta(days=90)
REMEMBER_COOKIE_DURATION=datetime.timedelta(days=1)
