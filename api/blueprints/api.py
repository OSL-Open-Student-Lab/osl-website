from flask import Blueprint, send_from_directory
from api.blueprints import auth, queue

api_bp = Blueprint(name="home", import_name=__name__, url_prefix="/api/v1/")

@api_bp.route('/static/<path:path>')
def get_static(path):
    return send_from_directory('static', path)

api_bp.register_blueprint(auth.auth_bp)
api_bp.register_blueprint(queue.queue_bp)

