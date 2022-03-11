from api import app
from api.db import setup_db
from api.blueprints import api
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS

def create_app():

    try:
        setup_db()
    except Exception as err:
        print(f"[ERROR]: Unable to setup database -> {err}")

    CORS(app, supports_credentials=True, methods="*", allow_headers="*")

    app.register_blueprint(api.api_bp)
    swagger_bp = get_swaggerui_blueprint(
        '/api/v1/apidocs', 
        '/static/swagger.json')
    app.register_blueprint(swagger_bp)

    return app
