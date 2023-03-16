import os
from flask_admin import Admin
from .models import db, User, Reader, News, Keyword, KeywordsFavorites, NewsFavorites, Advertisers, Widget, WidgetFavorites
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Reader, db.session))
    admin.add_view(ModelView(News, db.session))
    admin.add_view(ModelView(Keyword, db.session))
    admin.add_view(ModelView(KeywordsFavorites, db.session))
    admin.add_view(ModelView(Widget, db.session))
    admin.add_view(ModelView(WidgetFavorites, db.session))
    admin.add_view(ModelView(NewsFavorites, db.session))
    admin.add_view(ModelView(Advertisers, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))