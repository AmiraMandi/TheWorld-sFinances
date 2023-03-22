"""empty message

Revision ID: ec90f7c1db6c
Revises: 81e7d19caabf
Create Date: 2023-03-21 20:28:59.678752

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ec90f7c1db6c'
down_revision = '81e7d19caabf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('WidgetFavorites', schema=None) as batch_op:
        batch_op.drop_constraint('WidgetFavorites_widget_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'Widget', ['widget_id'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('WidgetFavorites', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('WidgetFavorites_widget_id_fkey', 'Widget', ['widget_id'], ['id'])

    # ### end Alembic commands ###
