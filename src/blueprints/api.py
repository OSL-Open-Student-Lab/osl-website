from flask import Blueprint
from src.blueprints import auth, query, devices

api_bp = Blueprint(name="home", import_name=__name__, url_prefix="/api/v1/")

api_bp.register_blueprint(auth.auth_bp)
api_bp.register_blueprint(query.query_bp)
api_bp.register_blueprint(devices.devices_bp)

@api_bp.route('/', methods=["GET"])
def index():
    return 'OSL Website API: V1.0'
