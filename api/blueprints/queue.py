import datetime

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.exc import SQLAlchemyError
from api.models import db, FacilityBooking, Facilities

from api.external_functions import _validate_queue_request_data as valid_queue
from api.external_functions import _str_to_time as str_to_time
from api.external_functions import _validate_time as valid_time

from json import loads

queue_bp = Blueprint(name='queue', import_name=__name__, url_prefix='/queue')


@queue_bp.route('', methods=['POST', 'GET'])
@login_required
def queries():
    if request.method == 'POST':
        if not request.args:
            data = loads(request.data.decode(encoding='utf-8'))
        else:
            data = dict(request.args)

        validating_data = valid_queue(data)
        if validating_data:
            return jsonify(validating_data), 400
        else:
            user_id = current_user.get_id()
            from_date = data['from_date']
            to_date = data['to_date']
            facility_id = data['facility_id']
                
        booking_timedelta = str_to_time(to_date) - str_to_time(from_date)

        if booking_timedelta.days > 0 or booking_timedelta.seconds >= 28800:
            return jsonify('Booking time is too long'), 400

        try:
            check_facility = Facilities.query.filter_by(id=facility_id).all()
            if not check_facility:
                return jsonify('No facility with this id'), 400
        except SQLAlchemyError as error:
            print(type(error), error)
            return jsonify('Unable to fetch data from the database'), 500

        try:
            new_facility = FacilityBooking(
                from_time=from_date,
                to_time=to_date,
                user_id=user_id,
                facility_id=facility_id)

            db.session.add(new_facility)
            db.session.commit()
        except SQLAlchemyError as error:
            print(type(error), error)
            return jsonify('Unable to write data to the database'), 500

        return jsonify(message='Booking was successfully added'), 200
    
    if request.method == 'GET':
        try:
            all_positions = []
            for el in db.session.query(FacilityBooking):
                from_time_dt = str_to_time(el.from_time)
                if from_time_dt > datetime.datetime.now():
                    all_positions.append({
                        "facility_booking_id":el.id,
                        "from_date":el.from_time,
                        "to_date":el.to_time,
                        "user_id":el.user_id,
                        "facility_id":el.facility_id})
        except SQLAlchemyError as error:
            print(type(error), error)
            return jsonify('Unable to fetch data from the database'), 500
        return jsonify(all_positions), 200

@queue_bp.route('/<int:facility_id>/<string:date>', methods=['GET'])
def get_bookings_by_params(facility_id, date):
    invalid_date = valid_time(date)
    if invalid_date:
        return jsonify(invalid_date), 400

    try:
        check_facility = Facilities.query.filter_by(id=facility_id).all()
        if not check_facility:
            return jsonify('No facility with this id'), 400
    except SQLAlchemyError as error:
        print(type(error), error)
        return jsonify('Unable to fetch data from the database'), 500


    try:
        bookings_by_id = FacilityBooking.query.filter_by(facility_id=facility_id).all()
        avaliable_bokings = []
        if not bookings_by_id:
            return jsonify(), 204
        for el in bookings_by_id:
            el_date_dt = str_to_time(el.from_time)
            facility_date_dt = str_to_time(date + " 00:00")
            delta = facility_date_dt + datetime.timedelta(days=1)
            if el_date_dt > facility_date_dt and el_date_dt < delta:
               avaliable_bokings.append({
                    "facility_booking_id":el.id,
                    "from_time":el.from_time,
                    "to_time":el.to_time,
                    "user_id":el.user_id,
                    "facility_id":el.facility_id})
        if not avaliable_bokings:
            return jsonify(), 204
        return jsonify(avaliable_bokings), 200
    except SQLAlchemyError as error:
        print(error)
        return jsonify('Unable to fetch data from database'), 500

