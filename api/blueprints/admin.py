from functools import wraps
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import exc
from api.models import FacilityType, Roles, db

admin_bp = Blueprint(name="admin", import_name=__name__, url_prefix="/admin")


def admin_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        try:
            cur_user_role_id = current_user.role_id
            cur_user_role = db.session.query(Roles).filter_by(id=cur_user_role_id).all()[0]
            print(cur_user_role, cur_user_role.name)
            if cur_user_role.name.lower() == 'admin':
                return f(*args, **kwargs)
            return jsonify(error_message="You don't have permission for this action") 
        except Exception as err:
            print(err)
            return jsonify(error_message="Something goes wrong")
    return wrapper



@admin_bp.route("/add_user_role", methods=["POST"])
@login_required
@admin_required
def add_user_role():
    if request.method == 'POST':
        data = request.json
        role = data['role']
        booking = data['booking']
        news = data['news']
        admin = data['admin']

        try:
            checking_role = db.session.query(Roles).filter_by(name=role).all()[0]
            if role == str(checking_role.name):
                return jsonify(error_message="Role with this name already exists", status=400)
        except exc.SQLAlchemyError as err:
            return jsonify(error_message=f'Unable to write data to the database', status=500)

        try:
            new_role = Roles(
                name=role,
                booking_access=booking,
                news_posting_access=news,
                admin_access=admin
            )

            db.session.add(new_role)
            db.session.commit()
        except exc.SQLAlchemyError as err:
            print(err)
            return jsonify(error_message='Unable to write data to the database', status=500)

        return jsonify(message='New role was created successfully', status=200)


@admin_bp.route("/add_facility", methods=["POST", "GET"])
@login_required
@admin_required
def get_device_list():
    if request.method == 'POST':
        data = request.json
        type = data['type']

        try:
            new_facility_type = FacilityType(type=type)
            db.session.add(new_facility_type)
            db.session.commit()
        except Exception as err:
            print("[ERROR]: ", err)
            return jsonify(error_message='Unable to write data to the database', status=500)

        return jsonify(message='New role was created successfully', status=200)

