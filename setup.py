from src import app
from src.models import db
from src.blueprints import api
from flask_session import Session



def create_app(testing=True):
    db.init_app(app)
    Session(app)

    with app.app_context():
        db.create_all()
    
    app.register_blueprint(api.api_bp)

    return app