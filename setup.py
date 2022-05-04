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
    --add-author        creates new author user for api
'''

def add_role(role_name, role_id):
    name = input(f'{role_name} name: ')
    passwd = getpass(f'{role_name} password: ')
    passwd2 = getpass('Confirm password: ')
    while passwd2 != passwd:
        passwd2 = getpass('Confirm password: ')
    email = input('Email address: ')
    try:
        with Session() as sess:
            user = User(
                name=name,
                password=pwd_context.hash(passwd),
                email=email,
                role=role_id)
            sess.add(user)
            sess.commit()
        print(f'{role_name} created succesfully')
    except Exception as err:
        print('Unable to create amdin: ', err)


commands = {
    '--help': lambda: print(HELP_MESSAGE),
    '--add-admin': lambda: add_role('Admin', 3),
    '--add-author': lambda: add_role('Author', 2)
}


if __name__ == '__main__':
    if len(argv) == 1:
        commands['--help']()
    for cmd in argv:
        if cmd in commands:
            commands[cmd]()

