import os
import datetime

from src.models import db

SECRET_KEY = 'dev_key'

#SQLALCHEMY_DATABASE_URI = 'sqlite:///../database/site.db'
SQLALCHEMY_DATABASE_URI = 'postgresql://lwhyaywahcvplq:cad4f8035162923ea3e2deeaa0ac233f9c921fc7eaaf3415cff72451895ea821@ec2-52-31-219-113.eu-west-1.compute.amazonaws.com:5432/dekaee32lbf2ro'
SQLALCHEMY_TRACK_MODIFICATIONS = False

SESSION_TYPE = 'sqlalchemy'
SESSION_SQLALCHEMY = db
PERMANENT_SESSION_LIFETIME = datetime.timedelta(days=7)
REMEMBER_COOKIE_DURATION=datetime.timedelta(days=7)
REMEMBER_COOKIE_HTTPONLY=True
