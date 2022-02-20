from flask_login import current_user, login_required, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Blueprint, jsonify, session, request
from api.models import Users, db
from api import lm



auth_bp = Blueprint(name='auth', import_name=__name__, url_prefix='/auth',)

@lm.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))


@lm.unauthorized_handler
def unauthorized():
    return jsonify(error_message='user unauthorized', status=403)

@auth_bp.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = dict(request.json)
        new_username = data.get('username')
        new_password = data.get('password')
        new_email = data.get('email')

        try:
            user_exists = Users.query.filter_by(name=new_username).first()
            email_exists = Users.query.filter_by(email=new_email).first()
        except:
            return jsonify(
                    error_message='Unable to load data from the database',
                    status=500)

        if user_exists is not None:
            return jsonify(
                    error_message='User with this name already exists',
                    status=400)

        if email_exists is not None:
            return jsonify(
                    error_message='User with this email already exists',
                    status=400)

        new_user = Users(
            name=new_username,
            password=generate_password_hash(password=new_password),
            email=new_email,
            role_id=2)

        try:
            db.session.add(new_user)
            db.session.commit()
        except:
            return jsonify(
                    error_message='Unable to write data to the database',
                    status=500)

        return jsonify(
                message='User created successfully',
                status=200)


@auth_bp.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = dict(request.json)
        checking_username = data.get('username')
        checking_password = data.get('password')

        try:
            checking_user = db.session.query(Users).\
                            filter_by(name=checking_username).first()
            if not checking_user:
                return jsonify(
                        error_message='User not found', 
                        status=500)
        except:
            return jsonify(
                    error_message='Unable load data from the database', 
                    status=500)
        else:
            db_password = checking_user.password

        if check_password_hash(db_password, checking_password):
            login_user(checking_user, remember=True)
            return jsonify(
                    message='User logged in successfully', 
                    status=200)



@auth_bp.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    print(session)
    return jsonify(
            message='Logged out successfully', 
            status=200)


@auth_bp.route('/current', methods=['GET'])
def is_auth():
    return jsonify(authorized=current_user.is_authenticated, status=200)
