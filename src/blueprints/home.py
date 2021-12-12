from flask import Blueprint, session
from flask.templating import render_template
home_bp = Blueprint(name='api', import_name=__name__)

@home_bp.route('/', methods=['GET'])
def index():
    print(session.items())
    user = session['_user_id']
    return render_template('home.html', username=f'{user}')

