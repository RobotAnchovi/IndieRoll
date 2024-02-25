"""empty message

Revision ID: a719b7eca437
Revises:
Create Date: 2024-02-23 19:00:05.401005

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'a719b7eca437'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():

    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('is_creator', sa.Boolean(), nullable=True),
    sa.Column('user_intro', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('video_content',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=500), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('genre', sa.String(length=500), nullable=False),
    sa.Column('video_url', sa.String(length=500), nullable=False),
    sa.Column('thumbnail_url', sa.String(length=500), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('video_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('review_text', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['video_id'], ['video_content.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('watchlist',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('video_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['video_id'], ['video_content.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA}")
        op.execute(f"ALTER TABLE video_content SET SCHEMA {SCHEMA}")
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA}")
        op.execute(f"ALTER TABLE watchlist SET SCHEMA {SCHEMA}")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('watchlist')
    op.drop_table('reviews')
    op.drop_table('video_content')
    op.drop_table('users')
    # ### end Alembic commands ###
