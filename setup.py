from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS

from api import app
from api.db import setup_db
from api.blueprints import api


def create_app():

    try:
        setup_db(app)
    except Exception as err:
        print(type(err), f"[ERROR]: Unable to setup database -> {err}")

    CORS(app, supports_credentials=True, allow_headers="*")
    app.register_blueprint(api.api_bp)
    
    return app


create_app().run(debug=True)
