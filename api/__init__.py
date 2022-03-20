from flask import Flask
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_pyfile('../config.py')

lm = LoginManager()
lm.session_protection = 'strong'
lm.init_app(app)
