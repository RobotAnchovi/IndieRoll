from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class Watchlist(db.Model):
    __tablename__ = "watchlist"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    video_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("video_content.id")), nullable=True)

    user_watchlists = db.relationship("User", back_populates="watchlist_items")
    video_content = db.relationship("VideoContent", back_populates="watchlists")

    def to_dict(self):
        return {"id": self.id, "user_id": self.user_id, "video_id": self.video_id}
