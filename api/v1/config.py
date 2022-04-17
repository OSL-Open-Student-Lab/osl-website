from os import getenv, mkdir
from random import getrandbits

skey = getenv('FASTOSL_SECRETKEY')
if not skey:
    skey = hex(getrandbits(512))

db = getenv('PROJECT_DATABASES')
if not db:
    print('\033[7;32mINFO:\033[0;0m     No database env variable found')
    print('\033[7;32mINFO:\033[0;0m     Creating database ./storage/fastapi_osl')
    try:
        mkdir('storage')
    except:
        print('\033[7;32mINFO:\033[0;0m     Database in storage directory already exists')
    db = 'storage'


SECRET_KEY = skey
TOKEN_ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_DAYS = 7
SQLALCHEMY_DATABASE_URL = f'sqlite:///{db}/fastapi_osl'
