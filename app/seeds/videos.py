from app.models import db, VideoContent
from sqlalchemy.sql import text


def seed_videos():
    videos = [
        VideoContent(
            title="Bob Marley: One Love",
            description="This is an example video.",
            genre="Drama",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/bob-marley-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/bob+marley.mp4",
            user_id=1,
        ),
        VideoContent(
            title="Godzilla and Kong",
            description="This is another example video.",
            genre="Action",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/godzilla-kong-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/godzilla+and+kong.mp4",
            user_id=2,
        ),
        VideoContent(
            title="Moana",
            description="This is another example video.",
            genre="Fantasy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/moana-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/moana.mp4",
            user_id=3,
        ),
        VideoContent(
            title="Quiet Place",
            description="This is another example video.",
            genre="Horror",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/quiet-place-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/quiet+place.mp4",
            user_id=4,
        ),
        VideoContent(
            title="Spaceman",
            description="This is another example video.",
            genre="Comedy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/spaceman-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/spaceman.mp4",
            user_id=5,
        ),
    ]

    db.session.add_all(videos)
    db.session.commit()
    print("Videos seeded")


def undo_videos():
    db.session.execute(text("DELETE FROM video_content"))
    db.session.commit()
