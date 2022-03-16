from flask_login import current_user, login_required, login_user, logout_user
from flask import Blueprint, jsonify, request

from api.external_functions import _validate_register_request_data as valid_reg
from api.external_functions import _validate_login_request_data as valid_log
from api.models import Users, db
from api import lm

from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash, check_password_hash

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

        validating_data = valid_reg(data)
        if validating_data:
            return jsonify(validating_data), 400
        else:
            new_username = data.get('username')
            new_password = data.get('password')
            new_email = data.get('email')
        
        try:
            user_exists = Users.query.filter_by(name=new_username).first()
            email_exists = Users.query.filter_by(email=new_email).first()
        except SQLAlchemyError as error:
            print(type(error), error)
            return jsonify('Unable to fetch data from the database'), 500

        if user_exists is not None:
            return jsonify('User with this name already exists'), 400

        if email_exists is not None:
            return jsonify('User with this email already exists'), 400

        new_user = Users(
            name=new_username,
            password=generate_password_hash(password=new_password),
            email=new_email,
            role_id=2)

        try:
            db.session.add(new_user)
            db.session.commit()
        except SQLAlchemyError as error:
            print(type(error), error)
            return jsonify('Unable to write data to the database'), 500
    
        login_user(new_user, remember=True)
        return jsonify('User created successfully'), 200

@auth_bp.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        if not request.args:
            data = loads(request.data.decode(encoding='utf-8'))
        else:
            data = dict(request.args)

        validating_data = valid_log(data)
        if validating_data:
            return jsonify(validating_data), 400
        else:
            checking_username = data.get('username')
            checking_password = data.get('password')
            rememberme = data.get('rememberme')

        try:
            checking_user = db.session.query(Users).\
                            filter_by(name=checking_username).first()
            if not checking_user:
                return jsonify(error_message='User not found'), 400
        except SQLAlchemyError as error:
            print(type(error), error)
            return jsonify(error_message='Unable fetch data from the database'), 500 
        else:
            db_password = checking_user.password

        if not check_password_hash(db_password, checking_password):
            return jsonify(error_message='Passwords do not match'), 400
        else:
            print(rememberme)
            login_user(checking_user, remember=rememberme, force=True)
            return jsonify(message='User logged in successfully'), 200
        


@auth_bp.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return jsonify(message='Logged out successfully'), 200

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
        return jsonify('Username field is empty'), 400

    try:
        checking_username = Users.query.filter_by(name=username).all()
    except SQLAlchemyError as error:
        print(type(error), error)
        return jsonify('Unable to fetch data from the database'), 500

    if checking_username:
        return jsonify(error_message='User with this name already exists'), 400
    return "", 200

@auth_bp.route('/email_exists', methods=['POST'])
def email_exists():
    email = loads(request.data.decode(encoding='utf-8')).get('email')
    if not email:
        return jsonify('Username field is empty'), 400

    try:
        checking_email = Users.query.filter_by(name=email).all()
    except SQLAlchemyError as error:
        print(type(error), error)
        return jsonify('Unable to fetch data from the database'), 500
    
    if checking_email:
        return jsonify(error_message='User with this email already exists'), 400
    return "", 200

