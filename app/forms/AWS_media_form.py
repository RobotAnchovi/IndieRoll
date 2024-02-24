from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, FileField
from wtforms.validators import DataRequired, Optional
from flask_wtf.file import FileAllowed

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
    thumbnail = FileField('Thumbnail', validators=[
        FileAllowed(['jpg', 'png', 'jpeg', 'gif'], 'Images only!'),
        Optional()
    ])
    video = FileField('Video', validators=[
        FileAllowed(['mp4', 'mov'], 'Videos only!'),
        Optional()
    ])

    def __init__(self, *args, is_update=False, **kwargs):
        super(VideoForm, self).__init__(*args, **kwargs)
        if is_update:
            self.thumbnail.validators.append(Optional())
            self.video.validators.append(Optional())
