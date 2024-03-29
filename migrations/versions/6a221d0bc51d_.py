"""empty message

Revision ID: 6a221d0bc51d
Revises: c2eb35e76096
Create Date: 2023-04-12 17:57:13.071942

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6a221d0bc51d'
down_revision = 'c2eb35e76096'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Advertisers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(length=200), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Advertisers', schema=None) as batch_op:
        batch_op.drop_column('email')

    # ### end Alembic commands ###
