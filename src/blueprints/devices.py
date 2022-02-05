from crypt import methods
from tempfile import TemporaryFile
from flask.blueprints import Blueprint
from src.models import Facilities, db

devices_bp = Blueprint(name="devices", import_name=__name__, url_prefix="/devices")

@devices_bp.route("/", methods=["GET"])
def get_device_list():
    try:
        device_list = db.session.query(Facilities)
    except Exception as err:
        print(err)