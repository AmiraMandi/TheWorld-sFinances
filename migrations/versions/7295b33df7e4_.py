"""empty message

Revision ID: 7295b33df7e4
Revises: 
Create Date: 2023-03-24 18:52:35.146038

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7295b33df7e4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Keyword',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('keyword', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('keyword')
    )
    op.create_table('User',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('Widget',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('source', sa.String(length=120), nullable=False),
    sa.Column('url', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=False),
    sa.Column('type_widget', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Advertisers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('company', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['User.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('KeywordsFavorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('keyword_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['keyword_id'], ['Keyword.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['User.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('News',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author', sa.String(length=100), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=2000), nullable=False),
    sa.Column('url', sa.String(length=250), nullable=False),
    sa.Column('source', sa.String(length=100), nullable=False),
    sa.Column('category', sa.String(length=100), nullable=False),
    sa.Column('language', sa.String(length=100), nullable=False),
    sa.Column('country', sa.String(length=100), nullable=False),
    sa.Column('published', sa.String(), nullable=False),
    sa.Column('keyword_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['keyword_id'], ['Keyword.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Reader',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('first_name', sa.String(length=120), nullable=True),
    sa.Column('last_name', sa.String(length=120), nullable=True),
    sa.Column('birth_date', sa.String(), nullable=True),
    sa.Column('gender', sa.Enum('male', 'female', 'other', name='varchar'), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['User.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('WidgetFavorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('widget_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['User.id'], ),
    sa.ForeignKeyConstraint(['widget_id'], ['Widget.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('NewsFavorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('news_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('author', sa.String(length=100), nullable=False),
    sa.Column('source', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['news_id'], ['News.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['User.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('NewsFavorites')
    op.drop_table('WidgetFavorites')
    op.drop_table('Reader')
    op.drop_table('News')
    op.drop_table('KeywordsFavorites')
    op.drop_table('Advertisers')
    op.drop_table('Widget')
    op.drop_table('User')
    op.drop_table('Keyword')
    # ### end Alembic commands ###