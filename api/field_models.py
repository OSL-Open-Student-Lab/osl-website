from pydantic import BaseModel, validator
from validate_email import validate_email
from datetime import datetime


class RegisterUserField(BaseModel):
    username: str
    password1: str
    password2: str
    email: str

    @validator('username')
    def valid_name(cls, nm):
        if len(nm) < 8:
            raise ValueError('Username is too short(8 symbols or more)')
        if ' ' in nm:
            raise ValueError('Username can not contain spaces')
        return nm

    @validator('email')
    def valid_email(cls, em):
        if not validate_email(em):
            raise ValueError('Wrong email format')
        return em
    
    @validator('password1')
    def check_password_format(cls, password):
        if len(password) < 8:
            raise ValueError('Password is too short')
        if password.isdigit():
            raise ValueError('Password must contain characters')
        if password.isalpha():
            raise ValueError('Password must contain numbers')
        if password.islower():
            raise ValueError('Password must contain characters in upper case')
        if password.isupper():
            raise ValueError('Password must contain characters in lower case')
        return password

    @validator('password2')
    def password_match(cls, password2, values):
        if 'password1' in values and password2 != values['password1']:
            print(values['password1'], password2, values)
            raise ValueError('Passwords must match')
        return password2


class LoginUserField(BaseModel):
    username: str
    password: str
    rememberme: bool

    @validator('username')
    def valid_name(cls, nm):
        if len(nm) < 8:
            raise ValueError('Username is too short(8 symbols or more)')
        if ' ' in nm:
            raise ValueError('Username can not contain spaces')
        return nm

    @validator('password')
    def check_password_format(cls, password):
        if len(password) < 8:
            raise ValueError('Password is too short')
        if password.isdigit():
            raise ValueError('Password must contain characters')
        if password.isalpha():
            raise ValueError('Password must contain numbers')
        if password.islower():
            raise ValueError('Password must contain characters in upper case')
        if password.isupper():
            raise ValueError('Password must contain characters in lower case')
        return password


class QueueField(BaseModel):
    user_id: int
    facility_id: int
    from_date: str
    to_date: str
    
    @validator('facility_id')
    def valid_id(cls, id):
        if id < 0:
            raise ValueError('Id must be >= 0')
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
    
