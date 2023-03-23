"""empty message

Revision ID: 81e7d19caabf
Revises: 487785f6dc20
Create Date: 2023-03-21 19:19:20.082863

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '81e7d19caabf'
down_revision = '487785f6dc20'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('KeywordsFavorites', schema=None) as batch_op:
        batch_op.drop_constraint('KeywordsFavorites_keyword_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'Keyword', ['keyword_id'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('KeywordsFavorites', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('KeywordsFavorites_keyword_id_fkey', 'Keyword', ['keyword_id'], ['id'])

    # ### end Alembic commands ###