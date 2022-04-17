import jwt

from datetime import timedelta, datetime
from jose.exceptions import JWTError

from api.v1.config import (
    SECRET_KEY,
    TOKEN_ALGORITHM,
)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    enc_data = data.copy()
    if expires_delta:
        expire = datetime.strftime(datetime.now() + expires_delta, '%d-%m-%Y %H:%M')
    else:
        expire = datetime.strftime(datetime.now() + timedelta(seconds=7), '%d-%m-%Y %H:%M')
    enc_data.update({'expire': expire})
    enc_jwt = jwt.encode(enc_data, SECRET_KEY, algorithm=TOKEN_ALGORITHM)
    return enc_jwt


def decode_token(token):
    try:
        dec_token = jwt.decode(token, SECRET_KEY, algorithms=[TOKEN_ALGORITHM])
        return dec_token
    except JWTError as err:
        print(err)
        return


def validate_access_token(token):
    dec_token = decode_token(token)
    print('dec:',dec_token)
    if dec_token != None:
        exp = dec_token.get('expire')
        if exp == None:
            return
        try:
            exp = datetime.strptime(exp, '%d-%m-%Y %H:%M')
        except Exception as err:
            print(err)
            return False
    else:
        return False

    try:
        now = datetime.now() 
        print(now)
    except Exception as err:
        print(err)
        return False

    if exp < now:
        return False
    else:
        return True

