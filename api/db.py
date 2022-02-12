from flask_session import Session
from api.models import db
from api import app

def setup_db():
    db.init_app(app)
    Session(app)

    with app.app_context():
        db.create_all()