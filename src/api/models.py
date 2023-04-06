from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()



class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active}


class Reader(db.Model):
    __tablename__ = "Reader"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('User.id'))
    first_name = db.Column(db.String(120))
    last_name = db.Column(db.String(120))
    birth_date = db.Column(db.String, unique=False)
    gender = db.Column(db.Enum('male', 'female', 'other', name='varchar'))
    user = relationship('User')
       
    def __repr__(self):
        return f'<Reader {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "birth_date": self.birth_date,
            "gender": self.gender,}



class KeywordsFavorites(db.Model):
    __tablename__ = "KeywordsFavorites"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('User.id'))
    keyword_id = db.Column(db.Integer, db.ForeignKey('Keyword.id', ondelete='CASCADE'))
    user = relationship('User')
    keyword = relationship('Keyword')

    def __repr__(self):
        return f'<KeywordsFavorites {self.user_id}>'

    def serialize(self):
        return {
            "id":self.id,
            "user_id": self.user_id,
            "keyword_id": self.keyword_id}



class Keyword(db.Model):
    __tablename__ = "Keyword"
    id = db.Column(db.Integer, primary_key=True)
    keyword = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'<Keyword {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "keyword": self.keyword,
            "description": self.description}


class WidgetFavorites(db.Model):
    __tablename__ = "WidgetFavorites"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('User.id'))
    widget_id = db.Column(db.Integer, ForeignKey('Widget.id', ondelete='CASCADE'))
    user = relationship('User')
    widget = relationship('Widget', backref='favorites')

    def __repr__(self):
        return f'<WidgetFavorites {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "widget_id": self.widget_id
        }

    
class Widget(db.Model):
    __tablename__ = "Widget"
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
    __tablename__ = "News"
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    url = db.Column(db.String(250), nullable=False)
    source = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    language = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    published = db.Column(db.String, unique=False, nullable=False)
    keyword_id = db.Column(db.Integer, ForeignKey('Keyword.id'))
    keyword = relationship('Keyword')


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
            "keyword_id": self.keyword_id}


class NewsFavorites(db.Model):
    __tablename__ = "NewsFavorites"
    id = db.Column(db.Integer, primary_key=True)
    news_id = db.Column(db.Integer, ForeignKey('News.id'))
    user_id = db.Column(db.Integer, ForeignKey('User.id'))
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    source = db.Column(db.String(100), nullable=False)
    news = relationship('News')
    user = relationship('User')

    def __repr__(self):
        return f'<NewsFavorites {self.news_id}>'

    def serialize(self):
        return {
            "id":self.id,
            "news_id": self.news_id,
            "user_id": self.user_id,
            "title": self.title,
            "author": self.author,
            "source": self.source
             }


class Advertisers(db.Model):
    __tablename__ = "Advertisers"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('User.id'))
    name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100),nullable=False)
    company_address = db.Column(db.String(100) ,nullable=False)
    CIF_NIF = db.Column(db.String(100),nullable=True)
    user = relationship('User')


    def __repr__(self):
        return f'<Advertisers {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "last_name":self.last_name,
            "company": self.company,
            "comany_address":self.company_address,
            "CIF_NIF":self.CIF_NIF,
            "company": self.company}

