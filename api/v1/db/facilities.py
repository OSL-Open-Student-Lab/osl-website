from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.sql.schema import ForeignKey

from . import Base


class FacilityBooking(Base):
    __tablename__ = 'facility_bookings'

    id = Column(Integer, primary_key=True, autoincrement=True)
    from_time = Column(String(), nullable=False)
    to_time = Column(String(), nullable=False)
    facility_id = Column(
        Integer,
        ForeignKey('facilities.id'),
        nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)


class Facilities(Base):
    __tablename__ = 'facilities'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String())
    description = Column(Text())
    amount = Column(Integer, default=1, nullable=False)
    image_url = Column(String(), unique=True)
    facility_type_id = Column(
        Integer,
        ForeignKey('fatility_types.id'),
        nullable=False)


class FacilityType(Base):
    __tablename__ = 'fatility_types'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(), unique=True)
    image_url = Column(String(), unique=True)
