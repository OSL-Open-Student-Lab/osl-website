import re

from functools import wraps

from flask import (
    Blueprint, 
    session, 
    request, 
    render_template, 
    url_for, 
    redirect,
    flash,
    jsonify,
    abort)

from flask_mail import Message

from werkzeug.security import (
    generate_password_hash, 
    check_password_hash)

from src.models import Users, db
from src.email_token import *
from src import *


auth_bp = Blueprint(name='auth', import_name=__name__, url_prefix='/api/auth')


def login_required(func):
    @wraps(func)
    def wrapper(self):
        return func(self)
    return wrapper

@auth_bp.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        req = request.get_json('username')
        # print(req, req['username'], req['email'], req['password'], req['confirm_password'])

        new_username = req['username']
        new_password = str(req['password'])
        new_conf_password = str(req['confirm_password'])
        new_email = req['email']

        if not bool(re.match(r'[^@]+@[^@]+\.[^@]+', new_email)):
            print('The email adress is invalid')
            return {'Error': 'The email adress is invalid'}, 400
        
        if new_password != new_conf_password:
            print('Passwords are not the same', new_conf_password, new_password)
            return {'Error':'Passwords are not the same'}, 400

        if new_username is None or new_password is None:
            print('Missing username or password')
            return {'Error':'Missing username or password'}, 400


        user_exists = Users.query.filter_by(name=new_username).first()
        if user_exists is not None:
            return {'Error':'User with this name already exists'}, 400

        email_exists = Users.query.filter_by(email=new_email).first()
        if email_exists is not None:
            return {'Error':'User with this email already exists'}, 400
        
        
        new_user = Users(
            name=new_username, 
            password=generate_password_hash(password=new_password),
            email=new_email,
            email_confirm=False)
        try:
            db.session.add(new_user)
            db.session.commit()
        except:
            print('We have trouble with database!')

        # session['username'] = new_username
        # session['user_id'] = new_user.id
        # new_email_token = generate_confirmation_token(new_email)
        # flash('Registration is almost done. Check your mailbox before login!')
        print( {'username':new_username, 'user_id':new_user.id, 'redirect':url_for('auth.login')}, 201)
        return {'username':new_username, 'user_id':new_user.id, 'redirect':url_for('auth.login')}, 201


@auth_bp.route('/login', methods=['POST'])
def login():

    if 'username' in session:
        session.clear()
        print(f'session - {session.items()}')
        # return {'username':session['username'], 'user_id':session['user_id'], 'redirect':url_for('api.index')}

    if request.method == 'POST':
        req = request.get_json('username')

        checking_username = req['username']
        checking_password = str(req['password'])

        print(
            f'checking_username: {checking_username}\n',
            f'checking_password: {checking_password}\n'
        )

        checking_user = db.session.query(Users).filter_by(name=checking_username).first()
        print(checking_user)
        if not checking_user:
            return {'Error':'User not found'}, 500

        db_password = checking_user.password
        db_id = checking_user.id

        if check_password_hash(db_password, checking_password):
            session.permanent = True
            session['username'] = checking_username
            session['user_id'] = db_id

            return {'username':checking_username, 'user_id':db_id, 'redirect':url_for('api.index')}, 202


@auth_bp.route('/logout', methods=['GET'])
def logout():
    session.clear()
    return {'username':None, 'user_id':None, 'redirect':url_for('api.index')}


@auth_bp.route('/activate', methods=['GET'])
def activate():
    return {}


