from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Video
from sqlalchemy.exc import IntegrityError

content_routes = Blueprint('content', __name__)

@content_routes.route('', methods=['POST'])
@login_required
def add_content():

    if not current_user.is_creator:
        return jsonify({"error": "You must be a creator to add content"}), 403

    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    genre = data.get('genre')
    thumbnail_url = data.get('thumbnail_url')
    video_url = data.get('video_file')

    existing_movie = Video.query.filter((Video.title == title) | (Video.video_url == video_url)).first()
    if existing_movie:
        return jsonify({"error": "Movie already exists"}), 409


    if not title or not description or not genre or not thumbnail_url or not video_url:
        return jsonify({"error": "Missing data for required fields"}), 400

    new_video = Video(title=title, description=description, genre=genre, thumbnail_url=thumbnail_url, video_url=video_url)

    try:
        db.session.add(new_video)
        db.session.commit()
        return jsonify(new_video.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Could not add new content"}), 500
