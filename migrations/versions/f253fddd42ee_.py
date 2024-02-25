"""empty message

Revision ID: f253fddd42ee
Revises: a719b7eca437
Create Date: 2024-02-24 19:52:15.578590

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f253fddd42ee'
down_revision = 'a719b7eca437'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('watchlist', schema=None) as batch_op:
        batch_op.alter_column('video_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_constraint('watchlist_video_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'video_content', ['video_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('watchlist', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('watchlist_video_id_fkey', 'video_content', ['video_id'], ['id'], ondelete='CASCADE')
        batch_op.alter_column('video_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
