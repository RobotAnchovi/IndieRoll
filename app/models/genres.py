from .db import db, SCHEMA, environment


class Genre(db.Model):
    __tablename__ = 'genres'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
