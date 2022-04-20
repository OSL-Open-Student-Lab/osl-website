import os

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.exc import IntegrityError

from api.v1.routes import apirouter
from api.v1.db.setup_db import setup_db
from api.v1.config import prefix

def run_app():
    try:
        os.makedirs('api/v1/static/facilities')
        os.makedirs('api/v1/static/facility_types')
    except FileExistsError as ferr:
        print(' '.join((str(ferr).split()[2:])))

    app = FastAPI()

    origins = [
        "http://localhost",
        "http://localhost:3000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(apirouter)
    app.mount(
        '/api/v1/static',
        StaticFiles(directory='api/v1/static'),
        name='api/v1/static')
    try:
        setup_db()
    except IntegrityError:
        print(prefix+'\t  database already exists')

    return app
