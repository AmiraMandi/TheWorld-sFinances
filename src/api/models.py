from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    user_first_name = db.Column(db.String(120), nullable=False)
    user_last_name = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    birth_date = db.Column(db.DateTime, unique=False, nullable=False)
    gender = db.Column(db.Enum('male', 'female', 'other', name='varchar'))
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "user_first_name": self.user_first_name,
            "user_last_name": self.user_last_name,
            "email": self.email,
            "birth_date": self.birth_date,
            "gender": self.gender,
            "is_active": self.is_active}


class Readers(db.Model):
    __tablename__ = "readers"
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(100), unique=False, nullable=False)
    user_last_name = db.Column(db.String(100), unique=False, nullable=False)
       
    def __repr__(self):
        return f'<Readers {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "user_name": self.user_name,
            "user_last_name": self.user_last_name}



class Keywordsfavorites(db.Model):
    id_user = db.Column(db.Integer, primary_key=True)
    id_keywords = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<Keywords_favorites {self.id_user}>'

    def serialize(self):
        return {
            "id_user": self.id_user,
            "id_keywords": self.id_keywords}


class Keywords(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    keywords = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'<Keywords {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "keywords": self.keywords,
            "description": self.description}


class Widgetfavorites(db.Model):
    lector_id = db.Column(db.Integer, primary_key=True)
    widget_id = db.Column(db.Integer, ForeignKey('widgets.id'))
    widget = relationship('Widgets')

    def __repr__(self):
        return f'<Widget_favorites {self.lector.id}>'

    def serialize(self):
        return {
            "lector_id": self.lector_id,
            "widget_id": self.widget_id}

    
class Widgets(db.Model):
    __tablename__ = "widgets"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    source = db.Column(db.String(120), nullable=False)
    url = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    type_widget = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<Widget {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "source": self.source,
            "url": self.url,
            "description": self.description,
            "type_widget": self.type_widget}
    

class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    new_id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    url = db.Column(db.String(100), nullable=False)
    source = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    language = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    published = db.Column(db.DateTime, unique=False, nullable=False)
    id_keywords = db.Column(db.String(100), unique=False, nullable=False)

    def __repr__(self):
        return f'<News {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "new_id": self.new_id,
            "author": self.author,
            "title": self.title,
            "description": self.description,
            "source": self.source,
            "category": self.category,
            "language": self.language,
            "country": self.country,
            "published": self.published,
            "id_keywords": self.id_keywords}


class Newsfavorites(db.Model):
    news_id = db.Column(db.Integer, primary_key=True)
    reader_id = db.Column(db.Integer, primary_key=True)
    news_title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    favorite_new_source = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<News_favorites {self.news_id}>'

    def serialize(self):
        return {
            "news_id": self.news_id,
            "reader_id": self.reader_id,
            "news_title": self.news_title,
            "author": self.author,
            "favorite_new_source": self.favorite_new_source}


class Advertisers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Advertisers {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name}