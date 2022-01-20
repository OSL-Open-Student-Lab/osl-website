from os import name
from flask import Blueprint, session
from flask.templating import render_template

from src.models import db, Users, FacilityBooking, Facilities
from datetime import datetime, timedelta

home_bp = Blueprint(name='api', import_name=__name__)

@home_bp.route('/', methods=['GET'])
def index():
    print(session.items())
    user = "session['_user_id']"
    return render_template('home.html', username=f'{user}')

@home_bp.route('/test_db')
def test_db():
    
    fac1 = Facilities(
        name='printer 1'
    )
    fac2 = Facilities(
        name='printer 2'
    )

    db.session.add(fac1)
    db.session.add(fac2)

    user1 = Users(
        email='r@m.ru',
        name='tim',
        password='123',
    )
    user2 = Users(
        email='r123@m.ru',
        name='tim123',
        password='123',
    )

    db.session.add(user1)
    db.session.add(user2)

    new_book = FacilityBooking(
        # from_time=datetime.now(),
        # to_time=datetime.now()+timedelta(hours=3)
    )
    print(new_book, new_book.id, new_book.from_time)
    
    db.session.add(new_book)

    new_book.booking_users.add(user1)
    new_book.booking_users.add(user2)
    # new_book.facilities.append(fac1)
    # new_book.facilities.append(fac2)

    db.session.commit()
    return 'None'
