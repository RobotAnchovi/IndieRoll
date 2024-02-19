from .db import db, environment, SCHEMA, add_prefix_for_prod


class VideoContent(db.Model):
    __tablename__ = 'video_content'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    genre_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('genres.id')), nullable=False)
    video_file = db.Column(db.String(50), nullable=False)
    thumbnail_url = db.Column(db.String(50), nullable=False)
    # rating to be talked about more? to compute average rating
