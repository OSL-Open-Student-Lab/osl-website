from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy import ForeignKey, Table

db = SQLAlchemy()

class Cards(db.Model):
    __tablename__ = 'Cards'
    id = db.Column(db.Integer, unique=True, primary_key=True)
    enabled = db.Column(db.Boolean, default=True)


class EnterLog(db.Model):
    __tablename__ = 'LogEnter'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)


class Facilities(db.Model):
    __tablename__ = 'Facilities'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String())


class FacilityBooking(db.Model):
    __tablename__ = 'FacilityBooking'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    from_time = db.Column(db.String, unique=True)
    to_time = db.Column(db.String, unique=True)
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String, nullable=True)
    user_id = db.Column(db.Integer)
    facility_id = db.Column(db.Integer)


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

    def get_id(self):
        return self.id


# users_news_table = Table('UsersToNews', db.metadata, 
#     db.Column('news_id', ForeignKey('News.id'), primary_key=True),
#     db.Column('author_id', ForeignKey('Users.id'), primary_key=True),
# )
