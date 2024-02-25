from flask import Blueprint, request, jsonify
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user
from werkzeug.security import generate_password_hash
import re

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Authentication required'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    errors = {}
    data = form.data

    if not data["email"] or not re.match(r"[^@]+@[^@]+\.[^@]+", data["email"]):
        errors["email"] = "Must be a valid email address."
    if not data["password"] or len(data["password"]) < 6:
        errors["password"] = "Password must be 6 characters or more."
    if not data["username"] or len(data["username"]) < 4:
        errors["username"] = "Username must be 4 characters or more."

    existing_user = User.query.filter(
        (User.email == data["email"]) | (User.username == data["username"])
    ).first()
    if existing_user:
        errors["user"] = "A user with this email or username already exists"

    if errors:
        return jsonify({"errors": errors}), 400

    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401
