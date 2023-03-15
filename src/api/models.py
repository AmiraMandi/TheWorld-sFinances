from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()



class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
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
    __tablename__ = "Readers"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('User.id'))
    user_name = db.Column(db.String(100), unique=False, nullable=False)
    user_last_name = db.Column(db.String(100), unique=False, nullable=False)
    iduser = relationship('User')
       
    def __repr__(self):
        return f'<Readers {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "user_name": self.user_name,
            "user_last_name": self.user_last_name}



class KeywordsFavorites(db.Model):
    __tablename__ = "KeywordsFavorites"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('Readers.id'))
    id_keywords = db.Column(db.Integer, ForeignKey('Keywords.id'))
    reader = relationship('Readers')
    keywords = relationship('Keywords')

    def __repr__(self):
        return f'<KeywordsFavorites {self.user_id}>'

    def serialize(self):
        return {
            "user_id": self.user_id,
            "id_keywords": self.id_keywords}


class Keywords(db.Model):
    __tablename__ = "Keywords"
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


class WidgetFavorites(db.Model):
    __tablename__ = "WidgetFavorites"
    ID = db.Column(db.Integer, primary_key=True)
    reader_id = db.Column(db.Integer, ForeignKey('Readers.id'))
    widget_id = db.Column(db.Integer, ForeignKey('Widgets.id'))
    reader = relationship('Readers')
    widgets = relationship('Widgets')

    def __repr__(self):
        return f'<WidgetFavorites {self.ID}>'

    def serialize(self):
        return {
            "id": self.id,
            "reader_id": self.reader_id,
            "widget_id": self.widget_id}

    
class Widgets(db.Model):
    __tablename__ = "Widgets"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    source = db.Column(db.String(120), nullable=False)
    url = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    type_widget = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<Widgets {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "source": self.source,
            "url": self.url,
            "description": self.description,
            "type_widget": self.type_widget}
    

class News(db.Model):
    __tablename__ = "News"
    id = db.Column(db.Integer, primary_key=True)
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
            "author": self.author,
            "title": self.title,
            "description": self.description,
            "source": self.source,
            "category": self.category,
            "language": self.language,
            "country": self.country,
            "published": self.published,
            "id_keywords": self.id_keywords}


class NewsFavorites(db.Model):
    __tablename__ = "NewsFavorites"
    id = db.Column(db.Integer, primary_key=True)
    news_id = db.Column(db.Integer, ForeignKey('News.id'))
    reader_id = db.Column(db.Integer, ForeignKey('Readers.id'))
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    favorite_new_source = db.Column(db.String(100), nullable=False)
    news = relationship('News')
    readers = relationship('Readers')

    def __repr__(self):
        return f'<NewsFavorites {self.news_id}>'

    def serialize(self):
        return {
            "news_id": self.news_id,
            "reader_id": self.reader_id,
            "title": self.title,
            "author": self.author,
            "favorite_new_source": self.favorite_new_source}


class Advertisers(db.Model):
    __tablename__ = "Advertisers"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('User.id'))
    name = db.Column(db.String(100), nullable=False)
    user = relationship('User')

    def __repr__(self):
        return f'<Advertisers {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name}
