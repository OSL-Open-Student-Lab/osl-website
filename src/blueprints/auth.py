import re

from flask import (
    Blueprint, 
    session, 
    request, 
    render_template, 
    url_for, 
    redirect,
    flash)

from werkzeug.security import (
    generate_password_hash, 
    check_password_hash)

from src.models import Users, db
from src.email_token import *
from src import *



auth_bp = Blueprint(name='auth', import_name=__name__, url_prefix='/auth')


@auth_bp.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        print(request.json())
        new_username = request.form['username']
        new_password = request.form['password']
        new_conf_password = request.form['confirm_password']
        new_email = request.form['email']

        err = ''

        if not bool(re.match(r'[^@]+@[^@]+\.[^@]+', new_email)):
            err = 'The email adress is invalid'
            print(err, {'Error':'The email adress is invalid'})
        
        if new_password != new_conf_password:
            err = 'Passwords are not the same'
            print(err, {'Error':'Passwords are not the same'})
            
        if not err:
            new_user = Users(
                name=new_username, 
                password=generate_password_hash(password=new_password),
                email=new_email)
            try:
                db.session.add(new_user)
                db.session.commit()
            except:
                print('We have trouble with database!')

            session['username'] = new_username
            session['password'] = generate_password_hash(new_password)


            new_email_token = generate_confirmation_token(new_email)
            # flash('Registration is almost done. Check your mailbox before login!')
            return redirect(url_for('auth.login'))
        
        flash(err)
            
    return request.get_json()
    # return render_template('register.html')



@auth_bp.route('/login', methods=['POST', 'GET'])
def login():

    if 'username' in session:
        return redirect(url_for('home.index'))

    if request.method == 'POST':
        checking_username = request.form['username']
        checking_password = request.form['password']

        checking_user = db.session.query().filter_by(name=checking_username).first()
        print(checking_user)
        if not checking_user:
            return "Error: no such user!"
        else:
            db_username = checking_user.name
            db_password = checking_user.password

        if check_password_hash(db_password, checking_password):
            session.permanent = True
            session['username'] = checking_username
            session['password'] = generate_password_hash(checking_password)
            return redirect(url_for('home.index'))

    return render_template('login.html')


@auth_bp.route('/logout', methods=['GET'])
def logout():
    session.clear()
    return redirect(url_for('home.index'))


@auth_bp.route('/', methods=['GET'])
def index_redirect():
    return redirect(url_for('auth.login'))

