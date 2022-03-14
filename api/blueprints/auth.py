from flask_login import current_user, login_required, login_user, logout_user
from flask import Blueprint, jsonify, session, request
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import Users, db
from api import lm

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
            new_username = data.get('username')
            new_password = data.get('password')
            new_email = data.get('email')
        else:
            new_username = request.args.get('username')
            new_password = request.args.get('password')
            new_email = request.args.get('email')

        try:
            user_exists = Users.query.filter_by(name=new_username).first()
            email_exists = Users.query.filter_by(email=new_email).first()
        except:
            return jsonify(error_message='Unable to load data from the database'), 500

        if user_exists is not None:
            return jsonify(error_message='User with this name already exists'), 400

        if email_exists is not None:
            return jsonify(error_message='User with this email already exists'), 400

        new_user = Users(
            name=new_username,
            password=generate_password_hash(password=new_password),
            email=new_email,
            role_id=2)

        try:
            db.session.add(new_user)
            db.session.commit()
        except:
            return jsonify(error_message='Unable to write data to the database'), 500
    
        login_user(new_user, remember=True)
        return jsonify(message='User created successfully'), 200

@auth_bp.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        if not request.args:
            data = loads(request.data.decode(encoding='utf-8'))
            checking_username = data.get('username')
            checking_password = data.get('password')
        else:
            checking_username = request.args.get('username')
            checking_password = request.args.get('password')

        try:
            checking_user = db.session.query(Users).\
                            filter_by(name=checking_username).first()
            if not checking_user:
                return jsonify(error_message='User not found'), 400
        except Exception as err:
            print(err)
            return jsonify(error_message='Unable load data from the database'), 500 
        else:
            db_password = checking_user.password

        if not check_password_hash(db_password, checking_password):
            return jsonify(error_message='Passwords do not match'), 400
        else:
            login_user(checking_user, remember=True, force=True)
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
    checking_username = Users.query.filter_by(name=username).all()
    if checking_username:
        return jsonify(error_message='User with this name already exists'), 400
    return "", 200

@auth_bp.route('/email_exists', methods=['POST'])
def email_exists():
    email = loads(request.data.decode(encoding='utf-8')).get('email')
    checking_email = Users.query.filter_by(email=email).all()
    if checking_email:
        return jsonify(error_message='User with this email already exists'), 400
    return "", 200
