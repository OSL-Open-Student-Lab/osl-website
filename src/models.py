from enum import unique
from os import name
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

from sqlalchemy import ForeignKey, Table
from sqlalchemy.orm import relationship

db = SQLAlchemy()

# Main tables

class EnterLog(db.Model):
    __tablename__ = 'LogEnter'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)


class Facilities(db.Model):
    __tablename__ = 'Facilities'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String())


class FacilityType(db.Model):
    __tablename__ = 'FacilityType'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(), unique=True)


class News(db.Model):
    __tablename__ = 'News'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text())
    annotation = db.Column(db.Text())
    pic = db.Column(db.String(), default='default.jpg')


class UserAudit(db.Model):
    __tablename__ = 'UserAudit'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    action = db.Column(db.String(), nullable=False)
    model = db.Column(db.String(), nullable=False)
    record_id = db.Column(db.String(), nullable=False)


class Users(UserMixin, db.Model):
    __tablename__ = 'Users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)
    password = db.Column(db.String(), nullable=False)

    card_rel = relationship('Cards', backref='user')


class Roles(db.Model):
    __tablename__ = 'Roles'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(150), unique=True)
    can_booking = db.Column(db.Boolean, default=True)
    can_post_news = db.Column(db.Boolean, default=False)
    have_admin_access = db.Column(db.Boolean, default=False)


# Relationship tables

class FacilityBooking(db.Model):
    __tablename__ = 'FacilityBooking'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    from_time = db.Column(db.DateTime)
    to_time = db.Column(db.DateTime)

    user_id = db.Column(ForeignKey(Users.id))
    facility_id = db.Column(ForeignKey(Facilities.id))

    user_rel = relationship('Users', foreign_keys='FacilityBooking.user_id')
    facility_rel = relationship('Facilities', foreign_keys='FacilityBooking.facility_id')


class Cards(db.Model):
    __tablename__ = 'Cards'
    id = db.Column(db.Integer, unique=True, primary_key=True)
    enabled = db.Column(db.Boolean, default=True)
    user_id = db.Column(ForeignKey(Users.id))


NewsAuthors = db.Table('NewsAuthors', 
    db.Column('news_id', db.Integer, db.ForeignKey('News.id'), primary_key=True),
    db.Column('author_id', db.Integer, db.ForeignKey('Users.id'), primary_key=True)
)


UserRoles = db.Table('UserRoles',
    db.Column('user_id', db.Integer, db.ForeignKey('Users.id'), primary_key=True),
    db.Column('role_id', db.Integer, db.ForeignKey('Roles.id'), primary_key=True)
)
