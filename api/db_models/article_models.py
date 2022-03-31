from api.db_models import db

class ArticleCard(db.Model):
    __tablename__ = 'ArticleCard'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    header = db.Column(db.String(250), nullable=False)
    text = db.Column(db.Text(), nullable=False)
    author = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    data = db.Column(db.String(50), nullable=False)
    likes = db.Column(db.Integer, nullable=True)
    saves = db.Column(db.Integer, nullable=True)
