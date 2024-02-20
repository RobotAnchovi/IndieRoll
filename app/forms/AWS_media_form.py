from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SelectField, StringField, SubmitField
from wtforms.validators import DataRequired
from app.api.AWS_helpers import ALLOWED_EXTENSIONS_IMAGE, ALLOWED_EXTENSIONS_VIDEO
from app.models import Genre

def genre_choices():
    genres = Genre.query.all()
    return [(genre.id, genre.genre) for genre in genres]

class VideoForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    genre = SelectField('Genre', coerce=int, choices=genre_choices(), validators=[DataRequired()])
    thumbnail = FileField(
        'Thumbnail Image',
        validators=[
            FileRequired(),
            FileAllowed(ALLOWED_EXTENSIONS_IMAGE, 'png, jpg, jpeg, or gif files only!')
        ]
    )
    video = FileField(
        'Video File',
        validators=[
            FileRequired(),
            FileAllowed(ALLOWED_EXTENSIONS_VIDEO, 'Mov or mp4 files only!')
        ]
    )
    submit = SubmitField('Upload Movie')


# * For template use, update encryption type:
# * <form action="/posts/new" method="POST" enctype="multipart/form-data">
