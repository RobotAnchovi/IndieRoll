from .db import db
from sqlalchemy.schema import ForeignKey

class Watchlist(db.Model):
    __tablename__ = 'watchlist'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    video_id = db.Column(db.Integer, ForeignKey('videos.id'), nullable=False)



    user = db.relationship('User', backref=db.backref('watchlist_items', lazy=True))
    video = db.relationship('Video', backref='watchlisted_by_users', lazy=True)




    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.video_id
        }
