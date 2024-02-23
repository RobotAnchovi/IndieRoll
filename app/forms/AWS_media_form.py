from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, FileField
from wtforms.validators import DataRequired
from flask_wtf.file import FileRequired, FileAllowed

GENRE_CHOICES = [
    ("Action", "Action"),
    ("Comedy", "Comedy"),
    ("Drama", "Drama"),
    ("Fantasy", "Fantasy"),
    ("Horror", "Horror"),
]


class VideoForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    genre = SelectField("Genre", choices=GENRE_CHOICES, validators=[DataRequired()])
    thumbnail = FileField(
        "Thumbnail",
        validators=[
            FileRequired(),
            FileAllowed(["png", "jpg", "jpeg", "gif"], "Images only!"),
        ],
    )
    video = FileField(
        "Video",
        validators=[FileRequired(), FileAllowed(["mp4", "mov"], "Videos only!")],
    )
