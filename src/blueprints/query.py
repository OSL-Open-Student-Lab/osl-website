from flask import Blueprint, session, redirect, url_for

query_bp = Blueprint(import_name=__name__, name='qeury', url_prefix='/osl/query')


@query_bp.route('', methods=['POST', 'GET'])
def query_index():
    if session.get('username'):
        return '<p>That is it, bitch</p>'
    else:
        return redirect(url_for('auth.login'))
