from src import app
from src.models import db
from src.blueprints import auth, query, swagger
from flask_session import Session

db.init_app(app)
Session(app)


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.register_blueprint(auth.auth_bp)
    app.register_blueprint(query.query_bp)
    app.register_blueprint(swagger.swagger_ui_bp, url_prefix=swagger.SWAGGER_URL)
    
    app.run(debug=True)
