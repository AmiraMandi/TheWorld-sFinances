"""empty message

Revision ID: 8d9be7d05774
Revises: c11389f9cde4
Create Date: 2023-03-17 18:10:02.694400

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8d9be7d05774'
down_revision = 'c11389f9cde4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Reader', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('last_name', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('birth_date', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('gender', sa.Enum('male', 'female', 'other', name='varchar'), nullable=True))

    with op.batch_alter_table('User', schema=None) as batch_op:
        batch_op.drop_column('first_name')
        batch_op.drop_column('gender')
        batch_op.drop_column('last_name')
        batch_op.drop_column('birth_date')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('User', schema=None) as batch_op:
        batch_op.add_column(sa.Column('birth_date', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('last_name', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('gender', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('first_name', sa.VARCHAR(length=120), autoincrement=False, nullable=True))

    with op.batch_alter_table('Reader', schema=None) as batch_op:
        batch_op.drop_column('gender')
        batch_op.drop_column('birth_date')
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    # ### end Alembic commands ###