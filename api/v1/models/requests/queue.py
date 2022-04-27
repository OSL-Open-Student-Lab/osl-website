from pydantic import BaseModel, validator
from datetime import datetime

class QueueField(BaseModel):
    facility_id: int
    from_date: str
    to_date: str

    @validator('facility_id')
    def valid_id(cls, id):
        if id < 0:
            raise ValueError('Id must be greater then 0')
        return id

    @validator('from_date', 'to_date')
    def check_format(cls, dts):
        try:
            valid = bool(datetime.strptime(dts, '%d-%m-%Y %H:%M'))
        except ValueError:
            valid = None

        if not valid:
            raise ValueError('Invalid date format(must be %d-%m-%Y %H:%M)')
        return dts

