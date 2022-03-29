from json import loads
from functools import wraps

from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy.exc import SQLAlchemyError
from pydantic import ValidationError

from api import lm
from api.models import FacilityType, Facilities, Roles, Users, db
from api.external_functions import _convert_error as conv_err
from api.field_models import FacilityField, FacilityTypeField 

facility_bp = Blueprint(
        name='facilities',
        import_name=__name__, 
        url_prefix='/facilities')


@lm.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))


@lm.unauthorized_handler
def unauthorized():
    return jsonify(error_message='user unauthorized'), 403


def admin_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        try:
            cur_user_role_id = current_user.role_id
            cur_user_role = db.session.query(Roles).filter_by(id=cur_user_role_id).all()[0]
            if cur_user_role.name.lower() == 'admin':
                return f(*args, **kwargs)
            return jsonify(error_message="You don't have permission for this action"), 403
        except Exception as err:
            return jsonify(error_message="Something goes wrong"), 500
    return wrapper

@facility_bp.route('/add_type', methods=['POST'])
@login_required
@admin_required
def add_type():
    if request.method == 'POST':
        try:
            name = loads(request.data.decode(encoding='utf-8')).get('name')

            try:
                fac = FacilityTypeField(name=name)
            except ValidationError as error:
                print(error)
                return jsonify(conv_err(error)), 400
            
            try:
                new_type = FacilityType(name=fac.name)
                db.session.add(new_type)
                db.session.commit()
            except SQLAlchemyError as serr:
                print(serr)
                return jsonify('unable to write data to the database'), 500

            return jsonify('new facility type was successfully added'), 200 
        
        except Exception as error:
            print(error)
            return jsonify('something goes wrong'), 500


@facility_bp.route('/add_equipment', methods=['POST'])
@login_required
@admin_required
def add_equipment():
    if request.method == 'POST':
        try:
            name = loads(request.data.decode(encoding='utf-8')).get('name')
            type_id = loads(request.data.decode(encoding='utf-8')).get('type_id')

            try:
                fac = FacilityField(name=name, type_id=type_id)
            except ValidationError as error:
                print(error)
                return jsonify(conv_err(error)), 400

            try:
                new_facility = Facilities(
                    name=fac.name,
                    facility_type_id=fac.type_id)
                db.session.add(new_facility)
                db.session.commit()
            except SQLAlchemyError as serr:
                print(serr)
                return jsonify('unable to write data to the database'), 500

            return jsonify('new facility was successfully added'), 200 
        
        except Exception as error:
            print(error)
            return jsonify('something goes wrong'), 500


@facility_bp.route('/get_types', methods=['GET'])
def get_type():
    try:
        try:
            facility_types = FacilityType.query.all()
        except SQLAlchemyError as serror:
            print(f'DATABASE ERROR:{serror}')
            return jsonify('unable to fetch data from the database'), 500

        return jsonify(
                [{'id':ft.id, 'name':ft.name} 
                    for ft in facility_types]), 200   

    except Exception as error:
        print(f'UNKNOWN ERROR: {error}')


@facility_bp.route('/get_list_by_type/<int:id>', methods=['GET'])
def get_list(id):
    try:
        try:
            facility_types = Facilities.query.\
                    filter_by(facility_type_id=id).all()
        except SQLAlchemyError as serror:
            print(f'DATABASE ERROR:{serror}')
            return jsonify('unable to fetch data from the database'), 500

        return jsonify(
                [{'id':ft.id, 'name':ft.name} 
                    for ft in facility_types]), 200   

    except Exception as error:
        print(f'UNKNOWN ERROR: {error}')

