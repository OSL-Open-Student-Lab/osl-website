from getpass import getpass
from sys import argv

from api.v1.db import Session
from api.v1.db.user import User
from api.v1.routes.auth import pwd_context

HELP_MESSAGE = '''
DESCRIPTION:
    setup.py - small cli admin panel for OSL Api v.0.1.0
USAGE:
    setup.py [command]
COMMANDS:
    --help              show this help message
    --add-admin         creates new admin user for api
'''


def add_admin():
    name = input('Admin name: ')
    passwd = getpass('Admin password: ')
    passwd2 = getpass('Confirm password: ')
    while passwd2 != passwd:
        passwd2 = getpass('Confirm password: ')
    email = input('Email address: ')
    try:
        with Session() as sess:
            admin_user = User(
                name=name,
                password=pwd_context.hash(passwd),
                email=email,
                role=3)
            sess.add(admin_user)
            sess.commit()
        print('Admin created succesfully')
    except Exception as err:
        print('Unable to create amdin: ', err)


commands = {
    '--help': lambda: print(HELP_MESSAGE),
    '--add-admin': add_admin
}


if __name__ == '__main__':
    for cmd in argv:
        if cmd in commands:
            commands[cmd]()