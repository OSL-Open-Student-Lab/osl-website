from pydantic import BaseModel, validator
from validate_email import validate_email

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

