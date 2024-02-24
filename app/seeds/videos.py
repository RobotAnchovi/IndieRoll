from app.models import db, VideoContent, environment, SCHEMA
from sqlalchemy.sql import text


def seed_videos():
    videos = [
        VideoContent(
            title="Bob Marley: One Love",
            description="The story of how reggae icon Bob Marley overcame adversity, and the journey behind his revolutionary music.",
            genre="Drama",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/bob-marley-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/bob+marley.mp4",
            user_id=1,
        ),
        VideoContent(
            title="Godzilla vs. Kong",
            description="The epic next chapter in the cinematic Monsterverse pits two of the greatest icons in motion picture history against each other--the fearsome Godzilla and the mighty Kong--with humanity caught in the balance.",
            genre="Action",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/godzilla-kong-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/godzilla+and+kong.mp4",
            user_id=2,
        ),
        VideoContent(
            title="Moana",
            description="In ancient Polynesia, when a terrible curse incurred by the demigod Maui reaches Moana's island, she answers the Ocean's call to seek out Maui to set things right.",
            genre="Fantasy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/moana-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/moana.mp4",
            user_id=3,
        ),
        VideoContent(
            title="A Quiet Place",
            description="A family struggles for survival in a world where most humans have been killed by blind but noise-sensitive creatures. They are forced to communicate in sign language to keep the creatures at bay.",
            genre="Horror",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/quiet-place-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/quiet+place.mp4",
            user_id=4,
        ),
        VideoContent(
            title="Spaceman",
            description="Jakub Procházka, orphaned as a boy and raised in the Czech countryside by his grandparents, overcomes his odds to become the country's first astronaut.",
            genre="Comedy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/spaceman-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/spaceman.mp4",
            user_id=5,
        ),
        VideoContent(
            title="Bob Marley: One Love",
            description="The story of how reggae icon Bob Marley overcame adversity, and the journey behind his revolutionary music.",
            genre="Drama",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/bob-marley-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/bob+marley.mp4",
            user_id=1,
        ),
        VideoContent(
            title="Godzilla vs. Kong",
            description="The epic next chapter in the cinematic Monsterverse pits two of the greatest icons in motion picture history against each other--the fearsome Godzilla and the mighty Kong--with humanity caught in the balance.",
            genre="Action",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/godzilla-kong-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/godzilla+and+kong.mp4",
            user_id=2,
        ),
        VideoContent(
            title="Moana",
            description="In ancient Polynesia, when a terrible curse incurred by the demigod Maui reaches Moana's island, she answers the Ocean's call to seek out Maui to set things right.",
            genre="Fantasy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/moana-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/moana.mp4",
            user_id=3,
        ),
        VideoContent(
            title="A Quiet Place",
            description="A family struggles for survival in a world where most humans have been killed by blind but noise-sensitive creatures. They are forced to communicate in sign language to keep the creatures at bay.",
            genre="Horror",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/quiet-place-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/quiet+place.mp4",
            user_id=4,
        ),
        VideoContent(
            title="Spaceman",
            description="Jakub Procházka, orphaned as a boy and raised in the Czech countryside by his grandparents, overcomes his odds to become the country's first astronaut.",
            genre="Comedy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/spaceman-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/spaceman.mp4",
            user_id=5,
        ),
        VideoContent(
            title="Bob Marley: One Love",
            description="The story of how reggae icon Bob Marley overcame adversity, and the journey behind his revolutionary music.",
            genre="Drama",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/bob-marley-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/bob+marley.mp4",
            user_id=1,
        ),
        VideoContent(
            title="Godzilla vs. Kong",
            description="The epic next chapter in the cinematic Monsterverse pits two of the greatest icons in motion picture history against each other--the fearsome Godzilla and the mighty Kong--with humanity caught in the balance.",
            genre="Action",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/godzilla-kong-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/godzilla+and+kong.mp4",
            user_id=2,
        ),
        VideoContent(
            title="Moana",
            description="In ancient Polynesia, when a terrible curse incurred by the demigod Maui reaches Moana's island, she answers the Ocean's call to seek out Maui to set things right.",
            genre="Fantasy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/moana-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/moana.mp4",
            user_id=3,
        ),
        VideoContent(
            title="A Quiet Place",
            description="A family struggles for survival in a world where most humans have been killed by blind but noise-sensitive creatures. They are forced to communicate in sign language to keep the creatures at bay.",
            genre="Horror",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/quiet-place-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/quiet+place.mp4",
            user_id=4,
        ),
        VideoContent(
            title="Spaceman",
            description="Jakub Procházka, orphaned as a boy and raised in the Czech countryside by his grandparents, overcomes his odds to become the country's first astronaut.",
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
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.video_content RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM video_content"))

    db.session.commit()
