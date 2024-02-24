from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, VideoContent, Watchlist
from sqlalchemy.exc import IntegrityError
from .AWS_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from app.forms import VideoForm

content_routes = Blueprint("content", __name__)


# *====> FETCH <====
# @content_routes.route("", defaults={"contentId": None}, methods=["GET"])
# @content_routes.route("/<int:contentId>", methods=["GET"])
# def get_content(contentId):
#     if contentId is None:
#         videos = VideoContent.query.all()
#         return jsonify([video.to_dict() for video in videos]), 200
#     else:
#         video = VideoContent.query.get(contentId)
#         if video is None:
#             return jsonify({"error": "Content not found"}), 404
#         return jsonify(video.to_dict()), 200


# Edited this to include watchlist info
@content_routes.route("", defaults={"contentId": None}, methods=["GET"])
@content_routes.route("/<int:contentId>", methods=["GET"])
@login_required
def get_content(contentId):
    if contentId is None:
        videos = VideoContent.query.all()
        videos_with_watchlist = []
        for video in videos:
            video_dict = video.to_dict()
            watchlist_item = Watchlist.query.filter_by(user_id=current_user.id, video_id=video.id).first()
            if watchlist_item:
                video_dict['watchlist_id'] = watchlist_item.id
            else:
                video_dict['watchlist_id'] = None
            videos_with_watchlist.append(video_dict)
        return jsonify(videos_with_watchlist), 200
    else:
        video = VideoContent.query.get(contentId)
        if video is None:
            return jsonify({"error": "Content not found"}), 404
        video_dict = video.to_dict()
        watchlist_item = Watchlist.query.filter_by(user_id=current_user.id, video_id=video.id).first()
        if watchlist_item:
            video_dict['watchlist_id'] = watchlist_item.id
        else:
            video_dict['watchlist_id'] = None
        return jsonify(video_dict), 200


# *====> CREATE <====
def is_allowed_file(filename, allowed_extensions):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in allowed_extensions


@content_routes.route("", methods=["POST"])
@login_required
def add_content():
    form = VideoForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        thumbnail = form.thumbnail.data
        video = form.video.data

        allowed_extensions = set(["png", "jpg", "jpeg", "gif", "mov", "mp4"])
        if not is_allowed_file(
            thumbnail.filename, allowed_extensions
        ) or not is_allowed_file(video.filename, allowed_extensions):
            return jsonify({"error": "File type not allowed"}), 400

        thumbnail_file = get_unique_filename(thumbnail.filename)
        video_file = get_unique_filename(video.filename)

        thumbnail_url_response = upload_file_to_s3(thumbnail, thumbnail_file)
        video_url_response = upload_file_to_s3(video, video_file)

        # Check for errors in the responses
        if "errors" in thumbnail_url_response:
            error_message = thumbnail_url_response.get(
                "errors", "Unknown error during thumbnail upload."
            )
            return jsonify({"errors": f"Thumbnail upload failed: {error_message}"}), 500

        if "errors" in video_url_response:
            error_message = video_url_response.get(
                "errors", "Unknown error during video upload."
            )
            return jsonify({"errors": f"Video upload failed: {error_message}"}), 500

        new_video = VideoContent(
            title=form.title.data,
            description=form.description.data,
            genre=form.genre.data,
            thumbnail_url=thumbnail_url_response["url"],
            video_url=video_url_response["url"],
            user_id=current_user.id,
        )

        try:
            db.session.add(new_video)
            db.session.commit()
            return jsonify(new_video.to_dict()), 201
        except IntegrityError:
            db.session.rollback()
            return jsonify({"error": "Could not add new content"}), 500
        except:
            # Catch-all return in case of unexpected issues
            return jsonify({"error": "An unexpected error occurred"}), 500
    else:
        # Handle form validation failure
        return (
            jsonify({"error": "Form validation failed", "form_errors": form.errors}),
            400,
        )


# *====> UPDATE <====
@content_routes.route("/<int:contentId>", methods=["PUT"])
@login_required
def update_content(contentId):
    video = VideoContent.query.get(contentId)
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
        video.description = (
            form.description.data if form.description.data else video.description
        )
        video.genre = form.genre.data if form.genre.data else video.genre

        try:
            db.session.commit()
            return jsonify(video.to_dict()), 200
        except IntegrityError:
            db.session.rollback()
            return jsonify({"error": "Could not update content"}), 500
    return jsonify({"error": "Invalid form data"}), 400


# *====> DELETE <====
@content_routes.route("/<int:video_id>", methods=["DELETE"])
@login_required
def delete_content(video_id):
    video = VideoContent.query.get(video_id)
    if not video or video.user_id != current_user.id:
        return jsonify({"error": "Content not found or unauthorized"}), 404

    thumbnail_remove_result = remove_file_from_s3(video.thumbnail_url)
    video_remove_result = remove_file_from_s3(video.video_url)

    if thumbnail_remove_result != True:
        return (
            jsonify(
                {
                    "error": f"Failed to delete thumbnail: {thumbnail_remove_result['errors']}"
                }
            ),
            500,
        )
    if video_remove_result != True:
        return (
            jsonify(
                {
                    "error": f"Failed to delete video file: {video_remove_result['errors']}"
                }
            ),
            500,
        )

    try:
        db.session.delete(video)
        db.session.commit()
        return jsonify({"message": "Content successfully deleted"}), 204
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
