from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user, logout_user
from app.models import db, Watchlist, VideoContent
from sqlalchemy.exc import IntegrityError

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('', methods=['POST'])
@login_required
def add_to_watchlist():
    user_id = current_user.id
    data = request.get_json()
    video_id = data.get('video_id')


    video = VideoContent.query.get(video_id)
    if not video:
        return jsonify({"error": "Video not found"}), 404


    existing_watchlist_item = Watchlist.query.filter_by(user_id=user_id, video_id=video_id).first()
    if existing_watchlist_item:
        return jsonify({"error": "Video already in watchlist"}), 409

    new_watchlist_item = Watchlist(user_id=user_id, video_id=video_id)

    try:
        db.session.add(new_watchlist_item)
        db.session.commit()
        return jsonify(new_watchlist_item.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Could not add video to watchlist"}), 500

@watchlist_routes.route('', methods=['GET'])
@login_required
def view_watchlist():
    watchlist_items = Watchlist.query.filter_by(user_id=current_user.id).all()
    watchlist_videos = []
    for item in watchlist_items:
        video = VideoContent.query.get(item.video_id)
        if video:
            watchlist_videos.append(video.to_dict())

    return jsonify(watchlist_videos), 200

@watchlist_routes.route('/<int:watchlist_id>', methods=['DELETE'])
@login_required
def remove_from_watchlist(watchlist_id):
    watchlist_item = Watchlist.query.get(watchlist_id)
    if not watchlist_item:
        return jsonify({"error": "Watchlist item not found"}), 404


    if watchlist_item.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    try:
        db.session.delete(watchlist_item)
        db.session.commit()
        return jsonify({"message": "Content successfully deleted"}), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Could not remove video from watchlist"}), 500
