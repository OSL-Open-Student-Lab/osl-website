from datetime import timedelta
from functools import wraps

import aioredis

from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from passlib.context import CryptContext

from fastapi import APIRouter, BackgroundTasks, Request
from fastapi.responses import JSONResponse
from starlette.responses import Response

from jwt.exceptions import DecodeError

from api.v1.models.requests.auth import (
    LoginUserField,
    RegisterUserField,
)

from api.v1.db import Session
from api.v1.db.user import User
from api.v1.token_gen import create_access_token, validate_access_token, decode_token


pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
router = APIRouter(prefix='/auth', tags=['Auth'])


def verify_passwd(plain, hashed):
    return pwd_context.verify(plain, hashed)


def get_passwd_hash(passwd):
    return pwd_context.hash(passwd)


def write_log(message):
    with open('errors.log', 'a') as log:
        log.write(f'{message}\n')


def is_authorized(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            request = kwargs.get('request')
            token = request.cookies.get('osl-user-session')
            dec_token = decode_token(token)
            if dec_token:
                username = dec_token.get('user')
            else:
                return JSONResponse(
                        content={'message': 'no username'},
                        status_code=400)
            with Session() as sess:
                user = sess.query(User).filter_by(name=username).all()
            if not user:
                return JSONResponse(
                        content={'message': 'no user with this username'},
                        status_code=403)
        except DecodeError as derr:
            print(derr)
            return JSONResponse(
                    content={'message': 'wrong headers'},
                    status_code=403)
        except Exception as err:
            print(err, type(err))
            return JSONResponse(
                    content={'message': 'unable to check user'},
                    status_code=500)
        return await func(*args, **kwargs)
    return wrapper


@router.post('/registration')
async def reg_usr(request: Request, reg: RegisterUserField, bg_tasks: BackgroundTasks):
    try:
        #redis = await aioredis.from_url('redis://localhost:6379')
        #data = await redis.get(f'user-{reg.username}')
        data = None
        if data:
            return JSONResponse(
                    content={'message': 'user with with name already exists'},
                    status_code=400)
        else:
            with Session() as session:
                check_user = session.query(User).filter_by(name=reg.username).all()
            if check_user:
                return JSONResponse(
                        content={'message': 'user with with name already exists'},
                        status_code=400)
    except SQLAlchemyError as serror:
        print(serror)
        bg_tasks.add_task(write_log(serror))
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
        bg_tasks.add_task(write_log(serror))
        return JSONResponse(
                content={'message': 'unable write data to the database'},
                status_code=500)

    try:
        
        # ??????????????
        with Session() as sess:
            u = sess.query(User).filter_by(name=reg.username).first()
            uid = u.id
            uname = u.name

        #redis = await aioredis.from_url('redis://localhost:6379')
        #await redis.set(f'user-{reg.username}', f'{reg.email}::{uid}::{pwd_context.hash(reg.password1)}') # ???????????????
        
        content = {'message': 'user created successfully'}
        token = create_access_token({'user': uname, 'uid': uid}, timedelta(days=7))
        resp = JSONResponse(content=content, status_code=200)
        resp.set_cookie(
            key='osl-user-session',
            value=token,
            httponly=True,
            samesite='strict',
            max_age=24*3600*7,
            expires=24*3600*7)
        return resp
    except Exception as serr:
        print(serr)
        bg_tasks.add_task(write_log(serr))
        return JSONResponse(
            content={'message': 'something goes wrong'},
            status_code=500)


@router.post('/login')
async def login(request: Request, log: LoginUserField, bg_tasks: BackgroundTasks):
    try:
        #redis = await aioredis.from_url('redis://localhost:6379')
        #data = await redis.get(f'user-{log.username}')
        data = None
        if data:
            _, uid, password = data.decode().split('::')
        else:
            with Session() as sess:
                user = sess.query(User).filter_by(name=log.username).all()
            if not user:
                return JSONResponse(
                        content={'message': 'no user with this username'},
                        status_code=400)
            else:
                user = user[0]
                password = user.password
                uid = user.id

        if not verify_passwd(log.password, password):
            return JSONResponse(
                    content={'message': 'wrong password'},
                    status_code=400)

        delta = timedelta(days=7) \
                if log.rememberme \
                else timedelta(days=1)

        token = create_access_token(
                {'user': log.username, 'uid': uid},
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
        bg_tasks.add_task(write_log(serror))
        return JSONResponse(
                content={'message': 'unable fetch data from the database'},
                status_code=500)
    except Exception as err:
        print(err)
        bg_tasks.add_task(write_log(err))
        return JSONResponse(
            content={'message': 'something goes wrong'},
            status_code=500)


@router.get('/current')
@is_authorized
async def read_me(request: Request, bg_tasks: BackgroundTasks):# token: str = Cookie(None)):
    token = request.cookies.get('osl-user-session')
    username = decode_token(token).get('user')

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
            bg_tasks.add_task(write_log(serror))
            return JSONResponse(status_code=500)


@router.get('/logout')
@is_authorized
async def logout(request: Request, response: Response):
    try:
        response.delete_cookie(key='osl-user-session')
        response.status_code = 200
    except:
        response.status_code = 403
    return response

