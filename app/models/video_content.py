from .db import db, environment, SCHEMA, add_prefix_for_prod


class VideoContent(db.Model):
    __tablename__ = "video_content"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    genre = db.Column(db.String(50), nullable=False)
    video_url = db.Column(db.String(50), nullable=False)
    thumbnail_url = db.Column(db.String(50), nullable=False)
    # rating to be talked about more? to compute average rating
    reviews = db.relationship('Review', backref='video', lazy=True)
    watchlists = db.relationship("Watchlist", backref="video", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "genre": self.genre,
            "thumbnail_url": self.thumbnail_url,
            "video_url": self.video_url,
        }
