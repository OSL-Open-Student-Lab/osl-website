from getpass import getpass
from sys import argv

from sqlalchemy.exc import IntegrityError

from api.v1.db import Session
from api.v1.db.user import User
from api.v1.routes.auth import pwd_context

from api.v1.models.requests.auth import RegisterUserField

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
        user = RegisterUserField(
                username=name,
                password1=passwd,
                password2=passwd2,
                email=email)
        with Session() as sess:
            username_exists = sess.query(User).filter_by(name=user.username).first()
            email_exists = sess.query(User).filter_by(email=user.email).first()
            if username_exists:
                print('User with name already exists')
                exit()
            if email_exists:
                print('User with email already exists')
                exit()
            user = User(
                name=user.username,
                password=pwd_context.hash(user.password1),
                email=user.email,
                role=role_id)
            sess.add(user)
            sess.commit()
        print(f'{role_name} created succesfully')
    except Exception as err:
        print('Unable to create amdin:\n', err)


commands = {
    '--help': lambda: print(HELP_MESSAGE),
    '--add-admin': lambda: add_role('Admin', 3),
    '--add-author': lambda: add_role('Author', 1)
}


if __name__ == '__main__':
    if len(argv) == 1:
        commands['--help']()
    for cmd in argv:
        if cmd in commands:
            commands[cmd]()

