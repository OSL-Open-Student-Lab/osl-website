from flask_session import Session
from flask_mail import Mail

from src import app
from src.blueprints import auth, query, home
from src.models import db


db.init_app(app)

Mail(app)
Session(app)

app.register_blueprint(auth.auth_bp)
app.register_blueprint(query.query_bp)
app.register_blueprint(home.home_bp)

app.run(debug=True)
