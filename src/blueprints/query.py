import datetime

from flask import Blueprint, request, session, jsonify, url_for
from flask_login import login_required
from sqlalchemy import desc

from src.models import db, FacilityBooking


query_bp = Blueprint('query', __name__, url_prefix='/api/query')


@query_bp.route('', methods=['POST', 'GET'])
@login_required
def queries():
    if request.method == 'POST':
        req = request.get_json('user_id')

        user_id = req['user_id']
        from_date = datetime.datetime.strptime(req['from_date'], r'%d-%m-%Y %H:%M:%S') #2021-12-12 14:12:00
        to_date = datetime.datetime.strptime(req['to_date'], r'%d-%m-%Y %H:%M:%S')
        facility_id = req['facility_id']

        booking_timedelta = to_date - from_date
        if booking_timedelta.days > 0 or booking_timedelta.seconds >= 28800:
            return {'Error': 'Booking time is too long'}, 400

        try:
            checking_positions = db.session.query(FacilityBooking).order_by(desc(FacilityBooking.from_time>datetime.datetime.now())).all()
        except Exception as e:
            return {'Error': 'Unable to get data from the database'}, 500

        if checking_positions:
            for el in checking_positions:
                if not validate_datetime_intervals((from_date, to_date), (el.from_time, el.to_time), facility_id == el.facility_id):
                    return {'Error': 'The time is invalid'}, 400

        try:
            new_facility = FacilityBooking(
                from_time=from_date,
                to_time=to_date,
                user_id=user_id,
                facility_id=facility_id)

            db.session.add(new_facility)
            db.session.commit()
        except Exception as e:
            return {'Error':'Unable to write data to the database'}, 500

        return {'Success':'Booking was successfully added'}, 200
    
    if request.method == 'GET':
        try:
            all_positions = db.session.query(FacilityBooking).filter(FacilityBooking.from_time>datetime.datetime.now()).all()
        except Exception as e:
            return {'Error': 'Unable to get data from the database'}, 500
        
        for i, el in enumerate(all_positions):
            all_positions[i] = {
                "from_time":el.from_time,
                "to_time":el.to_time,
                "user_id":el.user_id,
                "facility_id":el.facility_id
            }
        return {'Status':'Data was succefully loaded','postitions':all_positions}, 200



def validate_datetime_intervals(in1: tuple, in2: tuple, eql=True):
    right_now = datetime.datetime.now()
    if eql:
        return not(in1[0] < right_now or in1[1] < right_now) and \
               ((right_now < in2[0] < in2[1] < in1[0] < in1[1]) or \
               (right_now < in1[0] < in1[1] < in2[0] < in2[1]))
    else:
        return not(in1[0] <= right_now or in1[1] <= right_now)

