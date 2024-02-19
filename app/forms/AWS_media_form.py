from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

# !====>BOILERPLATE CODE FROM WALKTHROUGH: NEEDS TO BE ADJUSTED FOR OUR NEEDS<====


class ImageForm(FlaskForm):
    image = FileField(
        "Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
    submit = SubmitField("Create Post")


# * For template use, update encryption type:
# * <form action="/posts/new" method="POST" enctype="multipart/form-data">
