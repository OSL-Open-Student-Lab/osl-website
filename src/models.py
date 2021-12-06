from enum import unique
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Cards(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True) # здесь должен быть uuid
    enabled = db.Column(db.Boolean, default=True)


class enter_log(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)


class Facilities(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String())


class FacilityBooking(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    from_time = db.Column(db.DateTime, unique=True)
    to_time = db.Column(db.DateTime, unique=True)


class FacilityType(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(), unique=True)


class News(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text())
    annotation = db.Column(db.Text())
    pic = db.Column(db.String(), default='default.jpg')


class UserAudit(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    action = db.Column(db.String(), nullable=False)
    model = db.Column(db.String(), nullable=False)
    record_id = db.Column(db.String(), nullable=False)


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(), nullable=True)
    email = db.Column(db.String(), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)

