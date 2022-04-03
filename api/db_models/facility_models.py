from api.db_models import db


class FacilityBooking(db.Model):
    __tablename__ = 'FacilityBooking'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    from_time = db.Column(db.String(), nullable=False)
    to_time = db.Column(db.String(), nullable=False)
    facility_id = db.Column(
        db.Integer,
        db.ForeignKey('Facilities.id'),
        nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)


class Facilities(db.Model):
    __tablename__ = 'Facilities'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String())
    description = db.Column(db.Text())
    amount = db.Column(db.Integer, default=1, nullable=False)
    facility_type_id = db.Column(
        db.Integer,
        db.ForeignKey('FacilityType.id'),
        nullable=False)


class FacilityType(db.Model):
    __tablename__ = 'FacilityType'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(), unique=True)

