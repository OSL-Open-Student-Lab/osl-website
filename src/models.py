from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class Users(UserMixin, db.Model):
    __tablename__ = 'Users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)
    password = db.Column(db.String(), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('Roles.id'), nullable=False)


class UserAudit(db.Model):
    __tablename__ = 'UserAudit'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    action = db.Column(db.String(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    booking_id = db.Column(db.Integer, db.ForeignKey('FacilityBooking.id'), nullable=False)


class Roles(db.Model):
    __tablename__ = 'Roles'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(150), unique=True)
    booking_access = db.Column(db.Boolean, default=True)
    news_posting_access = db.Column(db.Boolean, default=False)
    admin_access = db.Column(db.Boolean, default=False)


class FacilityBooking(db.Model):
    __tablename__ = 'FacilityBooking'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    from_time = db.Column(db.DateTime)
    to_time = db.Column(db.DateTime)
    facility_id = db.Column(db.Integer, db.ForeignKey('Facilities.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)


class Facilities(db.Model):
    __tablename__ = 'Facilities'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String())
    facility_type_id = db.Column(db.Integer, db.ForeignKey('FacilityType.id'), nullable=False)


class FacilityType(db.Model):
    __tablename__ = 'FacilityType'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(), unique=True)

