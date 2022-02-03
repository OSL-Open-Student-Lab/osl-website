import re
import functools

from werkzeug.security import generate_password_hash, check_password_hash

from flask import Blueprint, session, request, url_for, render_template
from flask_login import login_user, user_logged_in, logout_user
from flask_wtf import form

from src.models import Users, db
from src import *


auth_bp = Blueprint(name='auth', import_name=__name__, url_prefix='/api/auth',)


@lm.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))


@lm.unauthorized_handler
def unauthorized():
    return {'Error': 'User unauthorized'}, 403


@auth_bp.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        form_data = dict(request.form)
        new_username = form_data.get('username')
        new_password = form_data.get('password')
        new_email = form_data.get('email')

        try:
            user_exists = Users.query.filter_by(name=new_username).first()
            email_exists = Users.query.filter_by(email=new_email).first()
        except:
            return {'Error': 'Unable to load data from the database'}, 500
            # logging

        if user_exists is not None:
            return {'Error': 'User with this name already exists'}, 400
            # logging
        if email_exists is not None:
            return {'Error': 'User with this email already exists'}, 400

        new_user = Users(
            name=new_username,
            password=generate_password_hash(password=new_password),
            email=new_email)

        try:
            db.session.add(new_user)
            db.session.commit()
        except:
            return {'Error': 'Unable to write data to the database'}, 500
            # logging

        return {'Status': 'User created successfully '}, 200

    return render_template('register.html')


@auth_bp.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        form_data = dict(request.form)
        checking_username = form_data.get('username')
        checking_password = form_data.get('password')

        try:
            checking_user = db.session.query(Users).\
                            filter_by(name=checking_username).first()
            if not checking_user:
                return {'Error': 'User not found'}, 500
        except:
            return {'Error': 'Unable load data from the database'}, 500
        else:
            db_password = checking_user.password

        if check_password_hash(db_password, checking_password):
            login_user(checking_user, remember=True)

            return {'Status': 'User logged in successfully'}, 200

    return render_template('login.html')


@auth_bp.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return {'username': None,
            'user_id': None,
            'redirect': url_for('api.index')}


@auth_bp.route('/is_authorized', methods=['GET'])
def is_auth():
    return {'Is authorized': bool(user_logged_in)}
