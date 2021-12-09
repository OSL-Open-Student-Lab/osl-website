from flask_session import Session
from flask_mail import Mail

from src import app
from src.blueprints import auth, home
from src.models import db


db.init_app(app)

Mail(app)
Session(app)

app.register_blueprint(auth.auth_bp)
app.register_blueprint(home.home_bp)

# with app.app_context():
#     db.create_all()


app.run(debug=True)
