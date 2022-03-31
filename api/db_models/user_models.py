from api.db_models import db 
from flask_login import UserMixin


class Users(UserMixin, db.Model):
    __tablename__ = 'Users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)
    password = db.Column(db.String(), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('Roles.id'), default=2)


class UserAudit(db.Model):
    __tablename__ = 'UserAudit'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    action = db.Column(db.String(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    booking_id = db.Column(
        db.Integer,
        db.ForeignKey('FacilityBooking.id'),
        nullable=False)


class Roles(db.Model):
    __tablename__ = 'Roles'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(150), unique=True)
    booking_access = db.Column(db.Boolean, default=True)
    news_posting_access = db.Column(db.Boolean, default=False)
    admin_access = db.Column(db.Boolean, default=False)

