from flask import Blueprint, json, jsonify, request
from flask_login import current_user, login_required, login_user, logout_user

from api import lm, app
from api.external_functions import _convert_error as conv_err
from api.models import Users, db
from api.field_models import*

from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import SQLAlchemyError

from pydantic import ValidationError
from json import loads


auth_bp = Blueprint(name='auth', import_name=__name__, url_prefix='/auth',)

@lm.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))


@lm.unauthorized_handler
def unauthorized():
    return jsonify(error_message='user unauthorized'), 403


@auth_bp.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        if not request.args:
            data = loads(request.data.decode(encoding='utf-8'))
        else:
            data = dict(request.args)
        
        try:
            reguser = RegisterUserField(
                username=data.get('username'),
                email=data.get('email'),
                password1=data.get('password1'),
                password2=data.get('password2'))
            print(reguser.dict())
        except ValidationError as error:
            return jsonify(conv_err(error)), 400
        
        try:
            user_exists = Users.query.filter_by(name=reguser.username).first()
            email_exists = Users.query.filter_by(email=reguser.email).first()
        except SQLAlchemyError as error:
            print(type(error), error)
            return jsonify('Unable to fetch data from the database'), 500

        if user_exists is not None:
            return jsonify('User with this name already exists'), 400

        if email_exists is not None:
            return jsonify('User with this email already exists'), 400

        new_user = Users(
            name=reguser.username,
            password=generate_password_hash(password=reguser.password1),
            email=reguser.email,
            role_id=2)

        try:
            db.session.add(new_user)
            db.session.commit()
        except SQLAlchemyError as error:
            print(type(error), error)
            return jsonify('unable to write data to the database'), 500
    
        login_user(new_user, remember=True)
        return jsonify('user created successfully'), 200


@auth_bp.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        try:
            if not request.args:
                data = loads(request.data.decode(encoding='utf-8'))
            else:
                data = dict(request.args)

            try:
                loguser = LoginUserField(
                    username = data.get('username'),
                    password = data.get('password'),
                    rememberme = data.get('rememberme'))
            except ValidationError as error:
                return jsonify(conv_err(error)), 400

            try:
                checking_user = db.session.query(Users).\
                                filter_by(name=loguser.username).first()
                if not checking_user:
                    return jsonify('user not found'), 400
            except SQLAlchemyError as error:
                print(type(error), error)
                return jsonify('unable fetch data from the database'), 500 
            else:
                db_password = checking_user.password

            if not check_password_hash(db_password, loguser.password):
                return jsonify('passwords do not match'), 400
            else:
                login_user(checking_user, remember=loguser.rememberme, force=True)
                return jsonify('user logged in successfully'), 200
        
        except Exception as error:            
            print(type(error), error)
            return jsonify('something goes wrong'), 500


@auth_bp.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return jsonify('logged out successfully'), 200


@auth_bp.route('/current', methods=['GET'])
def is_auth():
    authorized = current_user.is_authenticated
    if authorized:
        return jsonify(), 200
    return jsonify(), 401


@auth_bp.route('/username_exists', methods=['POST'])
def username_exists():
    username = loads(request.data.decode(encoding='utf-8')).get('username')
    if not username:
        return jsonify('username field is empty'), 400
    try:
        checking_username = Users.query.filter_by(name=username).all()
    except SQLAlchemyError as error:
        print(type(error), error)
        return jsonify('unable to fetch data from the database'), 500

    if checking_username:
        return jsonify('user with this name already exists'), 400
    return "", 200


@auth_bp.route('/email_exists', methods=['POST'])
def email_exists():
    email = loads(request.data.decode(encoding='utf-8')).get('email')
    if not email:
        return jsonify('username field is empty'), 400

    try:
        checking_email = Users.query.filter_by(name=email).all()
    except SQLAlchemyError as error:
        print(type(error), error)
        return jsonify('unable to fetch data from the database'), 500
    
    if checking_email:
        return jsonify('user with this email already exists'), 400
    return "", 200


