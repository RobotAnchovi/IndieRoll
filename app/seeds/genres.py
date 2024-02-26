
# from app.models import db, Genre  # Adjust the import path as necessary
# from sqlalchemy.sql import text
# # Adjust the import path as necessary
# from app.models.db import environment, SCHEMA


# def seed_genres():
#     # Define a list of genres to seed
#     genres_list = [
#         Genre(name="Action"),
#         Genre(name="Comedy"),
#         Genre(name="Drama"),
#         Genre(name="Fantasy"),
#         Genre(name="Horror"),
#     ]

#     # Add each genre to the session
#     for genre in genres_list:
#         db.session.add(genre)

#     # Commit the session to the database
#     db.session.commit()


# def undo_genres():
#     # Similar logic to undo_users, adapted for genres
#     if environment == "production":
#         db.session.execute(
#             f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM genres"))
#     db.session.commit()
