from .db import db

class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    thumbnail_url = db.Column(db.String(255), nullable=False)
    video_url = db.Column(db.String(255), nullable=False)

    reviews = db.relationship('Review', backref='video', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'genre': self.genre,
            'thumbnail_url': self.thumbnail_url,
            'video_url': self.video_url
        }
