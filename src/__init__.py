from flask import Flask
from datetime import timedelta

app = Flask(__name__)

app.config.from_pyfile('config.py')
app.permanent_session_lifetime = timedelta(days=14)
