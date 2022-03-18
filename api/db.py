from flask_session import Session
from api.models import db, Roles
#from api import app

def setup_db(app):
    db.init_app(app)
    Session(app)

    with app.app_context():
        db.create_all()
        any_roles = Roles.query.filter_by(id=1).all()
        if not any_roles:
            admin_role = Roles(
              name="admin",
              booking_access=True,
              news_posting_access=True,
              admin_access=True)

            user_role = Roles(
              name="user",
              booking_access=False,
              news_posting_access=False,
              admin_access=False)

            author_role = Roles(
              name="author",
              booking_access=False,
              news_posting_access=True,
              admin_access=False)

            db.session.add(admin_role)
            db.session.add(user_role)
            db.session.add(author_role)
            
            db.session.commit()

