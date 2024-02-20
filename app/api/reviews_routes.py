from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user, login_user, logout_user
from app.models import User, db, Review
from werkzeug.security import check_password_hash
import re

reviews_routes = Blueprint('reviews', __name__)

@reviews_routes.route('', methods=['POST'])
@login_required
def create_review():
    """
    Allows users to leave ratings and reviews.
    """
    data = request.get_json()

    #Error handling
    if not data or 'video_id' not in data or 'rating' not in data:
        return jsonify({"message": "Missing data for required fields"}), 400

    new_review = Review(
        user_id=current_user.id,
        video_id=data['video_id'],
        rating=data['rating'],
        review_text=data['review_text']
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify(new_review.to_dict()), 201


@reviews_routes.route('/<int:video_id>', methods=['GET'])
def get_reviews(video_id):
    """
    This route fetches all reviews for a specific movie, identified by video_id
    """
    reviews = Review.query.filter_by(video_id=video_id).all()
    return jsonify([review.to_dict() for review in reviews]), 200

# I added this route ^^^ because we didn't have a way of getting the reviews for the movie page. Might make it a full CRUD.


@reviews_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    """
    Allows users to update their rating or review.
    """
    review = Review.query.get(review_id)

    #Error handling
    if not review:
        return jsonify({"message": "Review not found"}), 404
    if review.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403
    data = request.get_json()
    if not data:
        return jsonify({"message": "No update data provided"}), 400

    if review and review.user_id == current_user.id:
        data = request.get_json()
        review.rating = data.get('rating', review.rating)
        review.review_text = data.get('review_text', review.review_text)

        db.session.commit()
        return jsonify(review.to_dict()), 200
    else:
        return jsonify({"message": "Review not found or unauthorized"}), 404


@reviews_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    """
    Allows users to delete their review.
    """
    review = Review.query.get(review_id)

    #Error Handling
    if not review:
        return jsonify({"message": "Review not found"}), 404
    if review.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    if review and review.user_id == current_user.id:
        db.session.delete(review)
        db.session.commit()
        return jsonify({"message": "Review deleted"}), 204
    else:
        return jsonify({"message": "Review not found or unauthorized"}), 404
