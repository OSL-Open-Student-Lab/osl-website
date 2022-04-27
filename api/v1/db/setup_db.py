from getpass import getpass

from . import Base, Session, engine
from .user import*
from .articles import*
from .facilities import*



def add_roles():
    Base.metadata.create_all(bind=engine)

    author_role = Role(
            name='author',
            booking_access=True,
            admin_access=False,
            posting_access=True)
    admin_role = Role(
            name='admin',
            booking_access=True,
            admin_access=True,
            posting_access=True)
    user_role = Role(
            name='user',
            booking_access=True,
            admin_access=False,
            posting_access=False)

    with Session() as sess:
        sess.add(author_role)
        sess.add(user_role)
        sess.add(admin_role)
        sess.commit()

