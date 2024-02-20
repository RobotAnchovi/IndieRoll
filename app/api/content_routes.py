from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, VideoContent
from sqlalchemy.exc import IntegrityError
from .AWS_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from app.forms import VideoForm
content_routes = Blueprint("content", __name__)


@content_routes.route("", methods=["GET"])
def get_content():
    videos = VideoContent.query.all()
    return jsonify([video.to_dict() for video in videos]), 200


@content_routes.route("", methods=["POST"])
@login_required
def add_content():

    if not current_user.is_creator:
        return jsonify({"error": "You must be a creator to add content"}), 403
    form = VideoForm()
    # form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        thumbnail = form.thumbnail.data
        video = form.video.data
        thumbnail_file = get_unique_filename(thumbnail.filename)
        video_file = get_unique_filename(video.filename)

        thumbnail_url = upload_file_to_s3(thumbnail, thumbnail_file)
        video_url = upload_file_to_s3(video, video_file)

        if "errors" in thumbnail_url or "errors" in video_url:
            return jsonify({"errors": "Could not upload files"}), 500

        new_video = VideoContent(
            title=form.title.data,
            description=form.description.data,
            genre=form.genre.data,
            thumbnail_url=thumbnail_url["url"],
            video_url=video_url["url"],
            user_id=current_user.id,
        )

        try:
            db.session.add(new_video)
            db.session.commit()
            return jsonify(new_video.to_dict()), 201
        except IntegrityError:
            db.session.rollback()
            return jsonify({"error": "Could not add new content"}), 500


    # data = request.get_json()
    # title = data.get("title")
    # description = data.get("description")
    # genre = data.get("genre")
    # thumbnail_url = data.get("thumbnail_url")
    # video_url = data.get("video_file")

    # existing_movie = VideoContent.query.filter(
    #     (VideoContent.title == title) | (VideoContent.video_url == video_url)
    # ).first()
    # if existing_movie:
    #     return jsonify({"error": "Movie already exists"}), 409

    # if not title or not description or not genre or not thumbnail_url or not video_url:
    #     return jsonify({"error": "Missing data for required fields"}), 400

    # new_video = VideoContent(
    #     title=title,
    #     description=description,
    #     genre=genre,
    #     thumbnail_url=thumbnail_url,
    #     video_url=video_url,
    # )

    # try:
    #     db.session.add(new_video)
    #     db.session.commit()
    #     return jsonify(new_video.to_dict()), 201
    # except IntegrityError:
    #     db.session.rollback()
    #     return jsonify({"error": "Could not add new content"}), 500


@content_routes.route("/<int:contentId>", methods=["PUT"])
@login_required
# def update_content(contentId):
    # if not current_user.is_creator:
    #     return jsonify({"error": "You must be a creator to update content"}), 403

    # video = VideoContent.query.get(contentId)
    # if video is None:
    #     return jsonify({"error": "Content not found"}), 404

    # data = request.get_json()
    # video.title = data.get("title", video.title)
    # video.description = data.get("description", video.description)
    # video.genre = data.get("genre", video.genre)
    # db.session.commit()
    # return jsonify(video.to_dict()), 200
def update_content(video_id):
    if not current_user.is_creator:
        return jsonify({"error": "You must be a creator to update content"}), 403

    video = VideoContent.query.get(video_id)
    if not video or video.user_id != current_user.id:
        return jsonify({"error": "Content not found or unauthorized"}), 404

    form = VideoForm()
    if form.validate_on_submit():
        if form.thumbnail.data:
            thumbnail = form.thumbnail.data
            thumbnail_file = get_unique_filename(thumbnail.filename)
            thumbnail_url = upload_file_to_s3(thumbnail, thumbnail_file)
            if "errors" in thumbnail_url:
                return jsonify({"errors": "Could not upload thumbnail"}), 500
            video.thumbnail_url = thumbnail_url["url"]

        if form.video.data:
            video_file = form.video.data
            video_filename = get_unique_filename(video_file.filename)
            video_url = upload_file_to_s3(video_file, video_filename)
            if "errors" in video_url:
                return jsonify({"errors": "Could not upload video"}), 500
            video.video_url = video_url["url"]

        video.title = form.title.data if form.title.data else video.title
        video.description = form.description.data if form.description.data else video.description
        video.genre = form.genre.data if form.genre.data else video.genre

        try:
            db.session.commit()
            return jsonify(video.to_dict()), 200
        except IntegrityError:
            db.session.rollback()
            return jsonify({"error": "Could not update content"}), 500
    return jsonify({"error": "Invalid form data"}), 400

@content_routes.route("/<int:contentId>", methods=["DELETE"])
@login_required
# def delete_content(contentId):
#     if not current_user.is_creator:
#         return jsonify({"error": "You must be a creator to delete content"}), 403

#     video = VideoContent.query.get(contentId)
#     if video is None:
#         return jsonify({"error": "Content not found"}), 404

#     db.session.delete(video)
#     db.session.commit()
#     return "", 204
def delete_content(video_id):
    if not current_user.is_creator:
        return jsonify({"error": "You must be a creator to delete content"}), 403

    video = VideoContent.query.get(video_id)
    if not video or video.user_id != current_user.id:
        return jsonify({"error": "Content not found or unauthorized"}), 404

    thumbnail_remove_result = remove_file_from_s3(video.thumbnail_url)
    video_remove_result = remove_file_from_s3(video.video_url)

    if thumbnail_remove_result != True:
        return jsonify({"error": f"Failed to delete thumbnail: {thumbnail_remove_result['errors']}"}), 500
    if video_remove_result != True:
        return jsonify({"error": f"Failed to delete video file: {video_remove_result['errors']}"}), 500

    try:
        db.session.delete(video)
        db.session.commit()
        return jsonify({"message": "Content successfully deleted"}), 204
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
