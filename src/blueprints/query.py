import datetime

from flask import Blueprint, request, session, jsonify, url_for
from flask_login import login_required
from sqlalchemy.sql.visitors import TraversibleType

from src.models import db, FacilityBooking


query_bp = Blueprint('query', __name__, url_prefix='/api/query')


@query_bp.route('', methods=['POST', 'GET'])
@login_required
def queries():
    if request.method == 'POST':
        req = request.get_json('user_id')

        user_id = req['user_id']
        from_date = req['from_date']
        to_date = req['to_date']
        facility_id = req['facility_id']

        try:
            new_facility = FacilityBooking(
                from_time=from_date,
                to_time=to_date,
                # created_at=datetime.datetime.utcnow().strftime(r'%Y-%m-%d %h:%M:%S'),
                user_id=user_id,
                facility_id=facility_id)

            db.session.add(new_facility)
            db.session.commit()
        except Exception as e:
            return {'Error':'Unable to write data to the database'}, 500

        return {'Success':'Booking was successfully added'}, 200 # temp line
    
    print(session.items())
    # get data from today and for the future
    try:

        all_positions = db.session.query(FacilityBooking).order_by(FacilityBooking.from_date).all()
    except:
        return {'Error': 'Unable to get data from the database'}, 500
    
    for i, el in enumerate(all_positions):
        all_positions[i] = {
            "from_time":el.from_time,
            "to_time":el.to_time,
            "user_id":el.user_id,
            "facility_id":el.facility_id
        }
    return {'Status':'Data was succefully loaded','postitions':all_positions}, 200

