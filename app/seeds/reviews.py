from app.models import db, Review, environment, SCHEMA

# Assuming you have this model or a similar method to fetch them
from app.models import User
from app.models import VideoContent


def seed_reviews():
    # Fetch some users to associate with reviews
    user_ids = [user.id for user in User.query.limit(5).all()]
    video_ids = [video.id for video in VideoContent.query.limit(5).all()]

    reviews_data = [
        {
            "user_id": user_ids[0],
            "video_id": video_ids[0],
            "rating": 5,
            "review_text": "Incredible experience!",
        },
        {
            "user_id": user_ids[1],
            "video_id": video_ids[1],
            "rating": 4,
            "review_text": "Really enjoyed it, but it could be better.",
        },
        {
            "user_id": user_ids[2],
            "video_id": video_ids[2],
            "rating": 3,
            "review_text": "Average, not what I expected.",
        },
        {
            "user_id": user_ids[3],
            "video_id": video_ids[3],
            "rating": 2,
            "review_text": "Below average, quite disappointing.",
        },
        {
            "user_id": user_ids[4],
            "video_id": video_ids[4],
            "rating": 1,
            "review_text": "Did not enjoy it at all.",
        },
        {
            "user_id": user_ids[1],
            "video_id": video_ids[2],
            "rating": 4,
            "review_text": "Really enjoyed it, but it could be better.",
        },
        {
            "user_id": user_ids[2],
            "video_id": video_ids[2],
            "rating": 3,
            "review_text": "Average, not what I expected.",
        },
        {
            "user_id": user_ids[3],
            "video_id": video_ids[2],
            "rating": 2,
            "review_text": "Below average, quite disappointing.",
        },
        {
            "user_id": user_ids[4],
            "video_id": video_ids[2],
            "rating": 1,
            "review_text": "Did not enjoy it at all.",
        },
    ]
    for review_info in reviews_data:
        review = Review(
            user_id=review_info["user_id"],
            video_id=review_info["video_id"],
            rating=review_info["rating"],
            review_text=review_info["review_text"],
        )
        db.session.add(review)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews;")

        db.session.commit()
