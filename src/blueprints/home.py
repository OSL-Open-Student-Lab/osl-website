from flask import (
    Blueprint, 
    session,
)

home_bp = Blueprint(name='api', import_name=__name__)

@home_bp.route('/', methods=['GET'])
@home_bp.route('/api', methods=['GET'])
def index():
    if session.items():
        current_user = session['username']
        current_user_id = session['user_id']
        return {'username':current_user, 'user_id':current_user_id}

