from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user, login_user, logout_user
from app.models import User, db
from werkzeug.security import check_password_hash
import re

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/signup', methods=['POST'])
def signup():
    """
    Registers a new user.
    """
    data = request.get_json()

    errors = {}
    if not data.get('email') or not re.match(r"[^@]+@[^@]+\.[^@]+", data['email']):
        errors['email'] = "Must be a valid email address."
    if not data.get('password') or len(data['password']) < 6:
        errors['password'] = "Password must be 6 characters or more."
    if not data.get('username') or len(data['username']) < 4:
        errors['username'] = "Username must be 4 characters or more."
    if not data.get('user_intro') or len(data['user_intro']) < 6:
        errors['user_intro'] = "User intro must have 6 characters or more."
    if not data.get('name'):
        errors['name'] = "Name field must be filled out."

    if errors:
        return jsonify({"errors": errors}), 400


    existing_user = User.query.filter((User.email == data['email']) | (User.username == data['username'])).first()
    if existing_user:
        return jsonify({"errors": "A user with this email or username already exists"}), 409


    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password'],
        name=data.get('name', ''),
        is_creator=data.get('is_creator', False),
        user_intro=data.get('user_intro', '')
    )


    db.session.add(new_user)
    try:
        db.session.commit()
        return jsonify(new_user.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"errors": str(e)}), 500

@user_routes.route('/login', methods=['POST'])
def login():
    """
    Authenticates a user and starts a session.
    """
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if len(password) < 6:
        return jsonify({"errors": "Password must be 6 characters or more"}), 400
    if not email or len(email) < 4:
        return jsonify({"errors": "Username must be 4 characters or more"}), 400




    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"errors": "User does not exist"}), 401

    if user.check_password(password):
        logout_user()
        login_user(user)
        return jsonify({
            'id': user.id,
            'email': user.email,
            'username': user.username,
        }), 200
    else:
        return jsonify({"errors": ["Incorrect password."]}), 401

@user_routes.route('/profile', methods=['GET'])
@login_required
def get_profile():
    """
    Retrieves the profile of the currently logged-in user.
    """

    user_dict = current_user.to_dict() if current_user.is_authenticated else {}
    return jsonify(user_dict), 200
