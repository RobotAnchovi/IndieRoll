from app.models import db, Watchlist, VideoContent, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlists():

    user_1_watchlist = [
        Watchlist(user_id=1, video_id=1),
        Watchlist(user_id=1, video_id=2),
        Watchlist(user_id=1, video_id=3),
        Watchlist(user_id=1, video_id=4),
    ]
    db.session.bulk_save_objects(user_1_watchlist)
    db.session.commit()

def undo_watchlists():

     if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.video_content RESTART IDENTITY CASCADE;")
     else :

        db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
     db.session.commit()
