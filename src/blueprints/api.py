from flask import Blueprint, send_from_directory
from src.blueprints import admin, auth, query
from src.models import db


api_bp = Blueprint(name="home", import_name=__name__, url_prefix="/api/v1/")

@api_bp.route('/', methods=["GET"])
def index():
    return 'OSL Website API: V1.0'

@api_bp.route('/static/<path:path>')
def get_static(path):
    return send_from_directory('static', path)

@api_bp.route('/roleback_db')
def recover_db():
    try:
        _ = db.session.connection()
    except:
        db.session.rollback()


api_bp.register_blueprint(auth.auth_bp)
api_bp.register_blueprint(query.query_bp)
api_bp.register_blueprint(admin.admin_bp)
