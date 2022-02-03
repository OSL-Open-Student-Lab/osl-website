from flask_swagger_ui import get_swaggerui_blueprint

SWAGGER_URL = '/api/v1/docs'
API_URL = '/'

swagger_ui_bp = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name':'OSL Website API V1.0'
    }
)