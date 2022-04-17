from pydantic import BaseModel, validator


class FacilityTypeField(BaseModel):
    name: str
    filename: str

    @validator('name')
    def valid_name(cls, name):
        if name.isdigit():
            raise ValueError('Name must contain characters')
        return name

    @validator('filename')
    def valid_filname(cls, filename):
        if filename.split('.')[1] not in ['jpg','png','jpeg']:
            raise ValueError('Invalid file format. Must be jpg, jpeg or png')
        return filename

class FacilityField(BaseModel):
    name: str
    type_id: int
    filename: str

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

    @validator('filename')
    def valid_filname(cls, filename):
        if filename.split('.')[1] not in ['jpg','png','jpeg']:
            raise ValueError('Invalid file format. Must be jpg, jpeg or png')
        return filename


