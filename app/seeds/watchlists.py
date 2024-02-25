from app.models import db, Watchlist, VideoContent, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlists():

    watchlist = [
        Watchlist(user_id=1, video_id=1),
        Watchlist(user_id=2, video_id=2),
        Watchlist(user_id=3, video_id=3),
        Watchlist(user_id=4, video_id=4),
        Watchlist(user_id=5, video_id=5),
        Watchlist(user_id=1, video_id=6),
        Watchlist(user_id=2, video_id=7),
        Watchlist(user_id=3, video_id=8),
        Watchlist(user_id=4, video_id=9),
        Watchlist(user_id=5, video_id=10),
        Watchlist(user_id=1, video_id=11),
        Watchlist(user_id=2, video_id=12),
        Watchlist(user_id=3, video_id=13),
        Watchlist(user_id=4, video_id=14),
        Watchlist(user_id=5, video_id=15),
    ]
    db.session.bulk_save_objects(watchlist)
    db.session.commit()

def undo_watchlists():

     if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.video_content RESTART IDENTITY CASCADE;")
     else :

        db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
     db.session.commit()
