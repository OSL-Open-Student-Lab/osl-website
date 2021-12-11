import re
import functools

from flask import Blueprint, session, request, url_for
from flask_login import login_user, user_logged_in, logout_user

from werkzeug.security import generate_password_hash, check_password_hash

from functools import wraps

from src.models import Users, db
from src import *


auth_bp = Blueprint(name='auth', import_name=__name__, url_prefix='/api/auth')

############################
#|Login manager decorators|#
############################
@lm.user_loader
def load_user(user_id):
    return Users.query.get(user_id)


@lm.unauthorized_handler
def unauthorized():
    return {'User unauthorized':'Cock', 'login':url_for('auth.login')}

###############################
#|Basic authentication routes|#
###############################
@auth_bp.route('/register', methods=['POST'])
def register():
    if user_logged_in:
        return {'logout!': url_for('auth.logout')}

    if request.method == 'POST':
        req = request.get_json('username')
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
            email=new_email)
        
        try:
            db.session.add(new_user)
            db.session.commit()
        except:
            print('We have trouble with database!')

        return {'username':new_username, 
                'user_id' :new_user.id,
                'redirect':url_for('auth.login')}, 201


@auth_bp.route('/login', methods=['POST', 'GET'])
def login():   
    if user_logged_in:
        return {'logout from login!': url_for('auth.logout')}

    if request.method == 'POST':
        req = request.get_json('username')

        checking_username = req['username']
        checking_password = str(req['password'])

        try:
            checking_user = db.session.query(Users).filter_by(name=checking_username).first()
            if not checking_user:
                return {'Error':'User not found'}, 500
        except:
            return {'Error': "Can't load data from database"}, 500
        else:
            db_password = checking_user.password
            db_id = checking_user.id

        if check_password_hash(db_password, checking_password):
            login_user(checking_user, remember=True)

            return {'username':checking_username, 
                    'user_id':db_id, 
                    'redirect':url_for('api.index')}, 202


@auth_bp.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return {'username':None, 'user_id':None, 'redirect':url_for('api.index')}

