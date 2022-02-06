from src import app
from src.models import db
from src.blueprints import api

from flask_session import Session
from flask_swagger_ui import get_swaggerui_blueprint

def create_app(testing=True):
    db.init_app(app)
    Session(app)

    with app.app_context():
        db.create_all()
    
    app.register_blueprint(api.api_bp)
    swagger_bp = get_swaggerui_blueprint('/apidocs', '/static/swagger.json')
    app.register_blueprint(swagger_bp)

    return app