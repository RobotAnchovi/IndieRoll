from app.models import db, Watchlist, VideoContent, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlists():

    user_1_watchlist = [
        Watchlist(user_id=1, video_id=1),
        Watchlist(user_id=1, video_id=2),
        Watchlist(user_id=1, video_id=3),
        Watchlist(user_id=1, video_id=4),
    ]

    other_watchlists = [
        Watchlist(user_id=user_id, video_id=video_id)
        for user_id in range(2, 6)
        for video_id in range(5, 11)
    ]

    db.session.bulk_save_objects(user_1_watchlist + other_watchlists)
    db.session.commit()

def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
