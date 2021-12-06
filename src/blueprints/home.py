from flask import (
    Blueprint, 
    session,
)

home_bp = Blueprint(name='home', import_name=__name__)

@home_bp.route('/', methods=['GET'])
@home_bp.route('/home', methods=['GET'])
def index():
    print(session.items())
    if 'username' in session:
        usr = session["username"]
    else:
        usr =  r'%usernamee%'
    return f'<h1>Home, {usr}</h1>'

