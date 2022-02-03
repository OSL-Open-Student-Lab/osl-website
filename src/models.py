from enum import unique
from os import name
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

from sqlalchemy import ForeignKey, Table
from sqlalchemy.orm import backref, relationship

db = SQLAlchemy()


class UserAudit(db.Model):
    __tablename__ = 'UserAudit'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    action = db.Column(db.String(), nullable=False)
    model = db.Column(db.String(), nullable=False)
    record_id = db.Column(db.String(), nullable=False)


class FacilityBooking(db.Model):
    __tablename__ = 'FacilityBooking'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    from_time = db.Column(db.DateTime)
    to_time = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    user_rel = db.relationship('Users')
    # facility = db.Column(db.Integer, db.ForeignKey('Facilities.id'))

class Users(UserMixin, db.Model):
    __tablename__ = 'Users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)
    password = db.Column(db.String(), nullable=False)
    # card_rel = relationship('Cards', backref='user')
    fac_bookings = db.relationship('FacilityBooking', backref='booking_users', lazy='dynamic')



class Facilities(db.Model):
    __tablename__ = 'Facilities'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String())
    # types = relationship('FacilityType', backref='type', lazy=True)
    # bookings = db.relationship('FacilityBooking', backref='facilities', lazy='select', uselist=True)


class FacilityType(db.Model):
    __tablename__ = 'FacilityType'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(), unique=True)
    # type_id =  db.Column(db.Integer, db.ForeignKey('Facilities.id'), nullable=False)
    # type_rel = relationship('Facilities')


class Roles(db.Model):
    __tablename__ = 'Roles'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(150), unique=True)
    can_booking = db.Column(db.Boolean, default=True)
    can_post_news = db.Column(db.Boolean, default=False)
    have_admin_access = db.Column(db.Boolean, default=False)
