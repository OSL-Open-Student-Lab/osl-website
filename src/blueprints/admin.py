from flask import Blueprint
from flask_login import login_required, current_user
from src.models import Facilities, db

admin_bp = Blueprint(name="devices", import_name=__name__, url_prefix="/admin")


def is_admin():
    cur_user = current_user
    print(cur_user)


@admin_bp.route("/", methods=["POST"])
@login_required
def get_device_list():
    pass


@admin_bp.route("/add_user_role", methods=["POST"])
@login_required
def add_user_role():
    pass

