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
            data = loads(request.data.decode(encoding='utf-8'))
            user_id = current_user.get_id()
            from_date = datetime.datetime.strptime(data['from_date'], r'%d-%m-%Y %H:%M:%S')
            to_date = datetime.datetime.strptime(data['to_date'], r'%d-%m-%Y %H:%M:%S')
            facility_id = data['facility_id']
        except Exception as err:
            return jsonify(error_message=f"Unable to get data"), 500


        booking_timedelta = to_date - from_date

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
            return jsonify(error_message=f'Unable to write data to the database'), 500

        return jsonify(message='Booking was successfully added'), 200
    
    if request.method == 'GET':
        try:
            all_positions = db.session.queue(FacilityBooking).\
                filter(FacilityBooking.from_time>datetime.datetime.now()).all()
        except exc.SQLAlchemyError as e:
            return jsonify(error_message='Unable to get data from the database'), 500
        
        for i, el in enumerate(all_positions):
            all_positions[i] = {
                "facility_booking_id":el.id,
                "from_time":el.from_time,
                "to_time":el.to_time,
                "user_id":el.user_id,
                "facility_id":el.facility_id
            }
        return jsonify(data=all_positions), 200

