from datetime import datetime, timedelta

from sqlalchemy.exc import SQLAlchemyError
from api.v1.db import facilities

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from api.v1.db.facilities import FacilityBooking, Facilities
from api.v1.routes.auth import is_authorized
from api.v1.models.requests.queue import QueueField
from api.v1.token_gen import decode_token
from api.v1.db import Session

from api.v1.config import prefix


router = APIRouter(prefix='/queues', tags=['Queues'])

@router.get('')
@is_authorized
async def get_queues(request: Request):
    try:
        token = request.cookies.get('osl-user-session')
        uid = decode_token(token).get('uid')
    except Exception as err:
        print(prefix+err)
        return JSONResponse()

    try:
        with Session() as sess:
            bookings = sess.query(FacilityBooking).filter_by(user_id=uid).all()
            result = []
            for book in bookings:
                from_time = datetime.strptime(
                        book.from_time,
                        "%d-%m-%Y %H:%M")
                if from_time > datetime.now():
                    facility = sess.query(Facilities).filter_by(id=book.facility_id).all()[0]
                    result.append({
                        'booking_id': book.id,
                        'facility_name': facility.name,
                        'from_date': book.from_time,
                        'to_date': book.to_time,
                        'image': facility.image_url})
            result.sort(key=lambda x: datetime.strptime(x, '%d-%m-%Y %H:%M'))
            return JSONResponse(content={'data': result}, status_code=200)
    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
                content={'message': 'unable to fetch data from the database'},
                status_code=500)


@router.delete('/{id}')
@is_authorized
async def delete_booking(request: Request, id: int):
    try:
        with Session() as sess:
            book_del = sess.query(FacilityBooking).filter_by(id=id)
            if not book_del:
                return JSONResponse(
                    content={'message': 'no facility with such id'},
                    status_code=400)
            else:
                book_del.delete()
                sess.commit()
                return JSONResponse(
                    content={'message': 'boooking deleted successfully'},
                    status_code=500)
    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
            content={'message': 'unable to remove booking'},
            status_code=500)


@router.get('/{id}')
@is_authorized
async def get_specific(request: Request, id: int, date: str | None = None):
    try:
        if not date:
            date = datetime.strftime(datetime.now(), '%d-%m-%Y 00:00')
        with Session() as sess:
            facility = sess.query(Facilities).filter_by(id=id).first()
            if facility:
                image_url = facility[0].image_url 
            else:
                return JSONResponse(
                    content={'message': 'invalid facility id'},
                    status_code=400)
            booking = sess.query(FacilityBooking).\
                    filter_by(facility_id=id).all()
            result = []
            for book in booking:
                from_time = datetime.strptime(
                        book.from_time,
                        "%d-%m-%Y %H:%M")
                if from_time > datetime.strptime(f'{date}', "%d-%m-%Y %H:%M"):
                    result.append({
                        'booking_id': book.id,
                        'facility_id': book.facility_id,
                        'from_date': book.from_time,
                        'to_date': book.to_time,
                        'image': image_url})
                return JSONResponse(content={'data': result}, status_code=200)
    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
                content={'message': 'unable to fetch data from the database'},
                status_code=500)


@router.post('')
@is_authorized
async def add_booking(queue: QueueField, request: Request):
    try:
        token = request.cookies.get('osl-user-session')
        uid = decode_token(token).get('uid')
    except Exception as err:
        print(err)
        return JSONResponse(
                content={'message': 'unable to get cookie'},
                status_code=403)

    from_date = datetime.strptime(queue.from_date, "%d-%m-%Y %H:%M")
    to_date = datetime.strptime(queue.to_date, "%d-%m-%Y %H:%M")
    if from_date >= to_date:
        return JSONResponse(
                content={'message': 'invalide date format'},
                status_code=400)
    if (to_date - from_date) > timedelta(days=4):
        return JSONResponse(
                content={'message': 'booking time is too long'},
                status_code=400)
    if (to_date - from_date) < timedelta(hours=1):
        return JSONResponse(
                content={'message': 'booking time is too short'},
                status_code=400)
    try:
        with Session() as sess:
            existing_bookings = sess.query(FacilityBooking).\
                filter_by(facility_id=queue.facility_id).all()
            for el in existing_bookings:
                from_date = datetime.strptime(queue.from_date, '%d-%m-%Y %H:%M')
                to_date = datetime.strptime(queue.to_date, '%d-%m-%Y %H:%M')
                from_date_ex = datetime.strptime(el.from_time, '%d-%m-%Y %H:%M')
                to_date_ex = datetime.strptime(el.to_time, '%d-%m-%Y %H:%M')
                valid = valid_time(
                    from_date,
                    to_date,
                    from_date_ex,
                    to_date_ex)
                if not valid:
                    return JSONResponse(
                            content={'message': 'your time crosses with another'},
                            status_code=400)
            new_booking = FacilityBooking(
                from_time=queue.from_date,
                to_time=queue.to_date,
                facility_id=queue.facility_id,
                user_id=uid)
            sess.add(new_booking)
            sess.commit()
    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
                    content={'message': 'unable to write data to the database'},
                    status_code=500)



def valid_time(from_date, to_date, from_date_ex, to_date_ex):
    A = from_date <= from_date_ex and \
        to_date >= from_date_ex and \
        to_date <= to_date_ex
    B = from_date >= from_date_ex and \
        from_date <= to_date and \
        from_date <= to_date_ex and \
        to_date <= to_date_ex
    C = from_date >= from_date_ex and \
        from_date <= to_date_ex and \
        to_date >= to_date_ex
    D = from_date_ex >= from_date and \
        from_date_ex <= to_date_ex and \
        from_date_ex <= to_date and \
        to_date_ex <= to_date

    if A or B or C or D:
        return False
    return True

