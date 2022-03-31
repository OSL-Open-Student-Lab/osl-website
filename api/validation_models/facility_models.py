from pydantic import BaseModel, validator


class FacilityTypeField(BaseModel):
    name: str
    
    @validator('name')
    def valid_name(cls, name):
        if name.isdigit():
            raise ValueError('Name must contain characters')
        return name

class FacilityField(BaseModel):
    name: str
    type_id: int

    @validator('name')
    def valid_name(cls, name):
        if name.isdigit():
            raise ValueError('Name must contain characters')
        return name

    @validator('type_id')
    def valid_id(cls, type_id):
        if isinstance(type_id, float):
            raise ValueError('Id must be integer')
        return type_id

