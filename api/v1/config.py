from os import getenv, mkdir
from random import getrandbits

prefix = '\033[7;32mINFO:\033[0;0m\t  '

skey = getenv('FASTOSL_SECRETKEY')
if not skey:
    skey = hex(getrandbits(512))

db = None #getenv('PROJECT_DATABASES')
if not db:
    try:
        mkdir('storage')
    except:
        pass
    db = 'sqlite:///storage/fastapi_osl.db'


SECRET_KEY = skey
TOKEN_ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_DAYS = 7
SQLALCHEMY_DATABASE_URL = db
#REDIS_URL = 'redis://localhost:6379'
TAGS = [
    {'name': 'Auth'},
    {'name': 'Facilities'},
    {'name': 'Queues'},
    {'name': 'Articles'}
]
