from flask import (
    Blueprint,
    session,
    url_for
)

home_bp = Blueprint(name='api', import_name=__name__)

@home_bp.route('/', methods=['GET'])
def index():
    if 'username' in session:
        current_user = session['username']
        current_user_id = session['user_id']
        return {'username':current_user, 'user_id':current_user_id}
    else:
        return {'username':None, 'user_id':None, 'redirect':url_for('auth.login')}

