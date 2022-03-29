from flask import Blueprint, jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from pydantic import ValidationError
from json import loads

from api.models import FacilityType, Facilities, db
from api.external_functions import _convert_error as conv_err
from api.field_models import FacilityField, FacilityTypeField 

facility_bp = Blueprint(
        name='facilities',
        import_name=__name__, 
        url_prefix='/facilities')


@facility_bp.route('/add_type', methods=['POST'])
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

