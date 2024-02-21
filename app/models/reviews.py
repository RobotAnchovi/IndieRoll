from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('video_content.id')), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text, nullable=True)

    user_reviews = db.relationship('User', backref=db.backref('reviews', lazy=True))
    video_content = db.relationship('VideoContent', backref=db.backref('reviews', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'video_id': self.video_id,
            'user_id': self.user_id,
            'rating': self.rating,
            'review_text': self.review_text
        }
