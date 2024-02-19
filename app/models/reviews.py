from .db import db, environment, SCHEMA
from sqlalchemy.schema import ForeignKey

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('videos.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text, nullable=True)


    user = db.relationship('User', backref=db.backref('reviews', lazy=True))

    video = db.relationship('Video', backref=db.backref('reviews', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'video_id': self.video_id,
            'user_id': self.user_id,
            'rating': self.rating,
            'review_text': self.review_text
        }
# --- Update Schema to video_id instead of movie_id ---
