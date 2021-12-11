from flask import Blueprint, session
from flask_login import current_user

home_bp = Blueprint(name='api', import_name=__name__)

@home_bp.route('/', methods=['GET'])
def index():
    print(session.items())
    return {'Status':str(session.items()), 'user': str(current_user)}, 200
    # if 'username' in session:
    #     current_user = session['username']
    #     current_user_id = session['user_id']
    #     return {'username':current_user, 'user_id':current_user_id}
    # else:
    #     return {'username':None, 'user_id':None, 'redirect':url_for('auth.login')}

