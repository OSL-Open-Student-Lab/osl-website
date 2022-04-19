from os import getenv, mkdir
from random import getrandbits

prefix = '\033[7;32mINFO:\033[0;0m' 

skey = getenv('FASTOSL_SECRETKEY')
if not skey:
    skey = hex(getrandbits(512))

db = getenv('PROJECT_DATABASES')
if not db:
    print(prefix, 'No database env variable found')
    print(prefix, 'Creating database ./storage/fastapi_osl')
    try:
        mkdir('storage')
    except:
        print(prefix, 'Database in storage directory already exists')
    db = 'storage'


SECRET_KEY = skey
TOKEN_ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_DAYS = 7
SQLALCHEMY_DATABASE_URL = f'sqlite:///{db}/fastapi_osl'

