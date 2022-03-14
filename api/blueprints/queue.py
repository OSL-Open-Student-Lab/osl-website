import datetime

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy import exc
from api.models import db, FacilityBooking

from json import loads

queue_bp = Blueprint(name='queue', import_name=__name__, url_prefix='/queue')


@queue_bp.route('', methods=['POST', 'GET'])
@login_required
def queries():
    if request.method == 'POST':
        try:
            if not request.args:
                data = loads(request.data.decode(encoding='utf-8'))
                user_id = current_user.get_id()
                from_date = data['from_date']
                to_date = data['to_date']
                facility_id = data['facility_id']
            else:
                user_id = current_user.get_id()
                from_date = request.args.get('from_data')
                to_date = request.args.get('to_date')
                facility_id = request.args.get('facility_id')
                
        except Exception as err:
            return jsonify(error_message=f"Unable to get data"), 400


        booking_timedelta = convert_string_to_time(to_date) - convert_string_to_time(from_date)

        if booking_timedelta.days > 0 or booking_timedelta.seconds >= 28800:
            return jsonify(error_message='Booking time is too long'), 400

        try:
            new_facility = FacilityBooking(
                from_time=from_date,
                to_time=to_date,
                user_id=user_id,
                facility_id=facility_id)
            db.session.add(new_facility)
            db.session.commit()
        except exc.SQLAlchemyError as err:
            print(err)
            return jsonify(error_message=f'Unable to write data to the database'), 500

        return jsonify(message='Booking was successfully added'), 200
    
    if request.method == 'GET':
        try:
            all_positions = []
            for el in db.session.query(FacilityBooking):
                from_time_dt = convert_string_to_time(el.from_time)
                if from_time_dt > datetime.datetime.now():
                    all_positions.append(el)
        except exc.SQLAlchemyError as err:
            print(err)
            return jsonify(error_message='Unable to get data from the database'), 500
        
        for i, el in enumerate(all_positions):
            all_positions[i] = {
                "facility_booking_id":el.id,
                "from_time":el.from_time,
                "to_time":el.to_time,
                "user_id":el.user_id,
                "facility_id":el.facility_id
            }
        return jsonify(all_positions), 200

@queue_bp.route('/<int:facility_id>/<string:date>', methods=['GET'])
def get_bookings_by_params(facility_id, date):
    try:
        print(facility_id, date)
        all_positions = []
        for el in FacilityBooking.query.filter_by(facility_id=facility_id):
            el_date_dt = convert_string_to_time(el.from_time)
            facility_date_dt = convert_string_to_time(date)
            print(el_date_dt, facility_date_dt)
            if el_date_dt > facility_date_dt:
                all_positions.append({
                    "facility_booking_id":el.id,
                    "from_time":el.from_time,
                    "to_time":el.to_time,
                    "user_id":el.user_id,
                    "facility_id":el.facility_id
                })
        return jsonify(all_positions), 200
    except Exception as err:
        print(err)
        return jsonify(error_message='Unable to load bookings from database'), 500
        


def convert_string_to_time(st):
    return datetime.datetime.strptime(st, "%d-%m-%Y %H:%M")
