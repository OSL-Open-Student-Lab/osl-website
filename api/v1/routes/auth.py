from datetime import timedelta

from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from passlib.context import CryptContext

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from starlette.responses import Response

from api.v1.request_models.user_models import (
    LoginUserField,
    RegisterUserField,
    LoginUserField,
)

from api.v1.db import Session
from api.v1.db.user import User
from api.v1.token_gen import create_access_token, validate_access_token, decode_token



pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def verify_passwd(plain, hashed):
    return pwd_context.verify(plain, hashed)

def get_passwd_hash(passwd):
    return pwd_context.hash(passwd)



router = APIRouter(prefix='/auth')


async def is_authorized(func):
    def wrapper(*args, **kwargs):
        pass
    return wrapper


@router.post('/registration')
async def reg_usr(reg: RegisterUserField):
    try:
        with Session() as session:
            check_user = session.query(User).filter_by(name=reg.username).all()
        if check_user:
            return JSONResponse(
                    content={'message': 'user with with name already exists'},
                    status_code=400)
    except SQLAlchemyError as serror:
        print(serror)
        return JSONResponse(
                content={'message': 'unable to check user'}, 
                status_code=500)


    try:
        with Session() as session:
            new_user = User(
                name=reg.username, 
                password=pwd_context.hash(reg.password1),
                email=reg.email)
            session.add(new_user)
            session.commit()

    except IntegrityError:
        return JSONResponse(
                content={'message': 'user with this email already exists'}, 
                status_code=500)
    except SQLAlchemyError as serror:
        print(serror)
        return JSONResponse(
                content={'message': 'unable write data to the database'}, 
                status_code=500)

    content = {'message': 'user created successfully'}
    
    # Change
    with Session() as sess:
        u = sess.query(User).filter_by(name=reg.username).first()
        uid = u.id
        uname = u.name
    
    token = create_access_token({'user': uname, 'uid': uid},timedelta(days=7))
    resp = JSONResponse(content=content, status_code=200)
    resp.set_cookie(
        key='osl-user-session',
        value=token,
        httponly=True,
        samesite='strict',
        max_age=24*3600*7,
        expires=24*3600*7)

    return resp


@router.post('/login')
async def login(log: LoginUserField):
    try:
        with Session() as sess:
            user = sess.query(User).filter_by(name=log.username).all()
        if user:
            user = user[0]
        else:
            return JSONResponse(
                    content={'message': 'no user with this username'},
                    status_code=400)
        
        valid = verify_passwd(log.password, user.password) 
        if not valid:
            return JSONResponse(
                    content={'message': 'wrong password'},
                    status_code=400)
        
        delta = timedelta(days=7) \
                if log.rememberme \
                else timedelta(days=1)

        token = create_access_token(
                {'user': log.username, 'uid': user.id},
                delta)
        resp = JSONResponse(
                content={'message':'user logged in successfully'}, 
                status_code=200)
        resp.set_cookie(
            key='osl-user-session',
            value=token,
            httponly=True,
            samesite='strict')
        return resp

    except SQLAlchemyError as serror:
        print(serror)
        return JSONResponse(
                content={'message': 'unable fetch data from the database'}, 
                status_code=500)


@router.get('/current')
async def read_me(request: Request):# token: str = Cookie(None)):
    try:
        token = request.cookies.get('osl-user-session')
        dec_token = decode_token(token)
        if dec_token:
            username = dec_token.get('user')
        else:
            return JSONResponse(status_code=400)
    except:
        return JSONResponse(content={'message': 'unauthorized'}, status_code=403)
    
    if not username:
        return JSONResponse(status_code=400)
    else:
        try:
            with Session() as sess:
                user = sess.query(User).filter_by(name=username).all()
            
            if not user:
                return JSONResponse(status_code=400)
            else:
                user = user[0]
                valid_tok = validate_access_token(token) 
                if valid_tok:
                    return JSONResponse(
                            content={
                                'message': 'authorized',
                                'username': username,
                                'id': user.id},
                            status_code=200)
                else:
                    return JSONResponse(status_code=403)
        except SQLAlchemyError as serror:
            print(serror)
            return JSONResponse(status_code=500)


@router.get('/logout')
async def logout(response: Response):
    try:
        response.delete_cookie(key='osl-user-session')
        response.status_code = 200
    except:
        response.status_code = 403
    return response

