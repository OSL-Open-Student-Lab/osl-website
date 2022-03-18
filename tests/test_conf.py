import pytest

from api import app
from api.db import setup_db
from api.blueprints import api
from flask_cors import CORS
from falsk_swagger_ui import get_swaggerui_blueprint

@pytest.fixture()
def app():
    app.config.update({
        'TESTING':True
    })

    setup_db(app)

    CORS(app, supports_credentials=True, allow_headers="*")

    app.register_blueprint(api.api_bp)
    swagger_bp = get_swaggerui_blueprint(
        '/api/v1/apidocs', 
        '/static/swagger.json')
    app.register_blueprint(swagger_bp)

    yield app

@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()



