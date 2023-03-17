"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Reader, News, Keyword, KeywordsFavorites, NewsFavorites, Advertisers, Widget, WidgetFavorites
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)

# USER ENDPONT
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user.serialize()), 200

@api.route('/users', methods=['POST'])
def create_user():
    email = request.json.get('email')
    password = request.json.get('password')
    is_active = request.json.get('is_active')
    user = User(email=email, password=password, is_active=is_active)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201

@api.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    user.email = request.json.get('email', user.email)
    user.password = request.json.get('password', user.password)
    user.is_active = request.json.get('is_active', user.is_active)
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return '', 204
#final End ponts Users 


# EndPOINT READERS
@api.route('/readers', methods=['GET'])
def get_all_readers():
    readers = Reader.query.all()
    return jsonify([r.serialize() for r in readers]), 200


@api.route('/readers/<int:reader_id>', methods=['GET'])
def get_reader(reader_id):
    reader = Reader.query.get(reader_id)
    if reader is None:
        return jsonify({'error': 'Reader not found'}), 404

    return jsonify(reader.serialize()), 200

@api.route('/', methods=['POST'])
def create():
    data = request.get_json()
    reader = Reader(
        user_id=data.get('user_id'),
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        birth_date=data.get('birth_date'),
        gender=data.get('gender')
    )
    db.session.add(reader)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify(error='The specified user does not exist.'), 400
    return jsonify(reader.serialize())


    return jsonify(reader.serialize()), 201

@api.route('/<int:reader_id>', methods=['PUT'])
def update(reader_id):

    data = request.get_json()
    reader = Reader.query.get(reader_id)
    if reader is None:
        return jsonify(error=f'Reader with ID {reader_id} does not exist.'), 404
    reader.user_id = data.get('user_id', reader.user_id)
    reader.first_name = data.get('first_name', reader.first_name)
    reader.last_name = data.get('last_name', reader.last_name)
    reader.birth_date = data.get('birth_date', reader.birth_date)
    reader.gender = data.get('gender', reader.gender)
    db.session.commit()
    return jsonify(reader.serialize()),200

@api.route('/readers/<int:reader_id>', methods=['DELETE'])
def delete_reader(reader_id):
    reader = Reader.query.get(reader_id)
    if reader is None:
        return jsonify({'error': 'Reader not found'}), 404

    db.session.delete(reader)
    db.session.commit()

    return jsonify({'message': 'Reader deleted successfully'}), 200


# ENDPPOINT KEYWORD_FAVORITES
@api.route('/keywords_favorites', methods=['GET'])
def get_keywords_favorites():
    try:
        keywords_favorites = KeywordsFavorites.query.all()
        return jsonify([k.serialize() for k in keywords_favorites]), 200
    except:
        return jsonify({'message': 'Error occurred while fetching keywords favorites.'}), 500

@api.route('/keywords_favorites', methods=['POST'])
def create_keywords_favorites():
    try:
        user_id = request.json['user_id']
        keyword_id = request.json['keyword_id']
        keywords_favorites = KeywordsFavorites(user_id=user_id, keyword_id=keyword_id)
        db.session.add(keywords_favorites)
        db.session.commit()
        return jsonify(keywords_favorites.serialize()), 201
    except:
        db.session.rollback()
        return jsonify({'message': 'Error occurred while creating keywords favorites.'}), 500

@api.route('/keywords_favorites/<int:id>', methods=['PUT'])
def update_keywords_favorites(id):
    try:
        keywords_favorites = KeywordsFavorites.query.filter_by(id=id).first()
        if not keywords_favorites:
            return jsonify({'message': 'KeywordsFavorites not found.'}), 404
        if 'user_id' in request.json:
            keywords_favorites.user_id = request.json['user_id']
        if 'keyword_id' in request.json:
            keywords_favorites.keyword_id = request.json['keyword_id']
        db.session.commit()
        return jsonify(keywords_favorites.serialize()), 200
    except:
        db.session.rollback()
        return jsonify({'message': 'Error occurred while updating keywords favorites.'}), 500

@api.route('/keywords_favorites/<int:id>', methods=['DELETE'])
def delete_keywords_favorites(id):
    try:
        keywords_favorites = KeywordsFavorites.query.filter_by(id=id).first()
        if not keywords_favorites:
            return jsonify({'message': 'KeywordsFavorites not found.'}), 404
        db.session.delete(keywords_favorites)
        db.session.commit()
        return jsonify({'message': 'KeywordsFavorites deleted successfully.'}), 200
    except:
        db.session.rollback()
        return jsonify({'message': 'Error occurred while deleting keywords favorites.'}), 500

@api.route('/keyword/', methods=['GET'])
def get_all_keywords():
    keywords = Keyword.query.all()
    return jsonify([keyword.serialize() for keyword in keywords])
@api.route('/keyword/<int:keyword_id>', methods=['GET'])
def get_keyword(keyword_id):
    keyword = Keyword.query.get(keyword_id)
    if keyword:
        return jsonify(keyword.serialize())
    else:
        return jsonify({"error": "Keyword not found"}), 404
@api.route('/keyword/', methods=['POST'])
def create_keyword():
    data = request.json
    keyword = Keyword(keyword=data['keyword'], description=data['description'])
    db.session.add(keyword)
    db.session.commit()
    return jsonify(keyword.serialize()), 201
@api.route('/keyword/<int:keyword_id>', methods=['PUT'])
def update_keyword(keyword_id):
    keyword = Keyword.query.get(keyword_id)
    if not keyword:
        return jsonify({"error": "Keyword not found"}), 404
    data = request.json
    keyword.keyword = data['keyword']
    keyword.description = data['description']
    db.session.commit()
    return jsonify(keyword.serialize())
@api.route('/keyword/<int:keyword_id>', methods=['DELETE'])
def delete_keyword(keyword_id):
    keyword = Keyword.query.get(keyword_id)
    if not keyword:
        return jsonify({"error": "Keyword not found"}), 404
    db.session.delete(keyword)
    db.session.commit()
    return jsonify({"message": "Keyword deleted successfully"})


@api.route('/widgetfavorites', methods=['GET', 'POST', 'PUT', 'DELETE'])
def widgetfavorites():
    if request.method == 'GET':
        favorites = WidgetFavorites.query.all()
        return jsonify([f.serialize() for f in favorites])
    elif request.method == 'POST':
        reader_id = request.json.get('reader_id')
        widget_id = request.json.get('widget_id')
        favorite = WidgetFavorites(reader_id=reader_id, widget_id=widget_id)
        db.session.add(favorite)
        db.session.commit()
        return jsonify(favorite.serialize()), 201
    elif request.method == 'PUT':
        lector_id = request.json.get('lector_id')
        favorite = WidgetFavorites.query.filter_by(lector_id=lector_id).first()
        if not favorite:
            return jsonify({'error': 'Favorite not found'}), 404
        reader_id = request.json.get('reader_id')
        widget_id = request.json.get('widget_id')
        favorite.reader_id = reader_id
        favorite.widget_id = widget_id
        db.session.commit()
        return jsonify(favorite.serialize()), 200
    elif request.method == 'DELETE':
        lector_id = request.json.get('lector_id')
        favorite = WidgetFavorites.query.filter_by(lector_id=lector_id).first()
        if not favorite:
            return jsonify({'error': 'Favorite not found'}), 404
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({'message': 'Favorite deleted'}), 200
    else:
        return jsonify({'error': 'Method not allowed'}), 405


@api.route('/widgets', methods=['GET'])
def get_widgets():
    widgets = Widget.query.all()
    return jsonify([widget.serialize() for widget in widgets]), 200

@api.route('/widgets/<int:id>', methods=['GET'])
def get_widget(id):
    widget = Widget.query.get(id)
    if not widget:
        return jsonify({'error': 'Widget not found'}), 404
    return jsonify(widget.serialize()), 200

@api.route('/widgets', methods=['POST'])
def add_widget():
    
    data = request.json
    new_widget = Widgets(
        name=data['name'],
        source=data['source'],
        url=data['url'],
        description=data['description'],
        type_widget=data['type_widget']
    )
    
    db.session.add(new_widget)
    db.session.commit()
    serialized_widget = new_widget.serialize()
    return jsonify(serialized_widget), 201


@api.route('/widgets/<int:id>', methods=['PUT'])
def update_widget(id):
    widget = Widget.query.get(id)
    if not widget:
        return jsonify({'error': 'Widget not found'}), 404
    widget.name = request.json.get('name', widget.name)
    widget.source = request.json.get('source', widget.source)
    widget.url = request.json.get('url', widget.url)
    widget.description = request.json.get('description', widget.description)
    widget.type_widget = request.json.get('type_widget', widget.type_widget)
    db.session.commit()
    return jsonify(widget.serialize()), 200


@api.route('/news', methods=['GET'])
def get_all_news():
    all_news = News.query.all()
    return jsonify([news.serialize() for news in all_news])


@api.route('/news/<int:news_id>', methods=['GET'])
def get_news(news_id):
    news = News.query.get(news_id)
    if news:
        return jsonify(news.serialize())
    else:
        return jsonify({"message": "News not found"}), 404


@api.route('/news', methods=['POST'])
def create_news():
    author = request.json.get('author')
    title = request.json.get('title')
    description = request.json.get('description')
    url = request.json.get('url')
    source = request.json.get('source')
    category = request.json.get('category')
    language = request.json.get('language')
    country = request.json.get('country')
    published = request.json.get('published')
    keyword_id = request.json.get('keyword_id')

    news = News(author=author, title=title, description=description, url=url, source=source, category=category, language=language, country=country, published=published, keyword_id=keyword_id)
    db.session.add(news)
    db.session.commit()

    return jsonify(news.serialize()), 201


@api.route('/news/<int:news_id>', methods=['PUT'])
def update_news(news_id):
    news = News.query.get(news_id)
    if not news:
        return jsonify({"message": "News not found"}), 404

    author = request.json.get('author', news.author)
    title = request.json.get('title', news.title)
    description = request.json.get('description', news.description)
    url = request.json.get('url', news.url)
    source = request.json.get('source', news.source)
    category = request.json.get('category', news.category)
    language = request.json.get('language', news.language)
    country = request.json.get('country', news.country)
    published = request.json.get('published', news.published)
    keyword_id = request.json.get('keyword_id', news.keyword_id)

    news.author = author
    news.title = title
    news.description = description
    news.url = url
    news.source = source
    news.category = category
    news.language = language
    news.country = country
    news.published = published
    news.keyword_id = keyword_id

    db.session.commit()

    return jsonify(news.serialize())


@api.route('/news/<int:news_id>', methods=['DELETE'])
def delete_news(news_id):
    news = News.query.get(news_id)
    if news:
        db.session.delete(news)
        db.session.commit()
        return jsonify({"message": "News deleted successfully"})
    else:
        return jsonify({"message": "News not found"}), 404

@api.route('/news_favorites', methods=['GET'])
def get_news_favorites():
    news_favorites = NewsFavorites.query.all()
    return jsonify([news_favorite.serialize() for news_favorite in news_favorites]), 200

@api.route('/news_favorites', methods=['POST'])
def create_news_favorite():
    data = request.get_json()
    news_id = data.get('news_id')
    reader_id = data.get('reader_id')
    title = data.get('title')
    author = data.get('author')
    source = data.get('source')
    news_favorite = NewsFavorites(news_id=news_id, reader_id=reader_id, title=title, author=author, source=source)
    db.session.add(news_favorite)
    db.session.commit()
    return jsonify(news_favorite.serialize()), 201

@api.route('/news_favorites/<int:news_favorite_id>', methods=['PUT'])
def update_news_favorite(news_favorite_id):
    news_favorite = NewsFavorites.query.get(news_favorite_id)
    if not news_favorite:
        return jsonify({'error': 'NewsFavorite not found'}), 404
    data = request.get_json()
    news_id = data.get('news_id')
    reader_id = data.get('reader_id')
    title = data.get('title')
    author = data.get('author')
    source = data.get('source')
    news_favorite.news_id = news_id
    news_favorite.reader_id = reader_id
    news_favorite.title = title
    news_favorite.author = author
    news_favorite.source = source
    db.session.commit()
    return jsonify(news_favorite.serialize()), 200

@api.route('/news_favorites/<int:id>', methods=['DELETE'])
def delete_news_favorite(id):
    favorite = NewsFavorites.query.get(id)
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return {"message": "NewsFavorite deleted successfully."}, 200
    else:
        return {"message": "NewsFavorite not found."}, 404 

@api.route('/advertisers', methods=['GET'])
def get_advertisers():
    advertisers = Advertisers.query.all()
    return jsonify([advertiser.serialize() for advertiser in advertisers]), 200

@api.route('/advertisers/<int:id>', methods=['GET'])
def get_advertiser(id):
    advertiser = Advertisers.query.get(id)
    if not advertiser:
        return jsonify({'error': 'Advertiser not found'}), 404
    return jsonify(advertiser.serialize()), 200

@api.route('/advertisers', methods=['POST'])
def create_advertiser():
    user_id = request.json.get('user_id')
    name = request.json.get('name')
    company = request.json.get('company')
    advertiser = Advertisers(user_id=user_id, name=name, company=company)
    db.session.add(advertiser)
    db.session.commit()
    return jsonify(advertiser.serialize()), 201

@api.route('/advertisers/<int:id>', methods=['PUT'])
def update_advertiser(id):
    advertiser = Advertisers.query.get(id)
    if not advertiser:
        return jsonify({'error': 'Advertiser not found'}), 404
    advertiser.name = request.json.get('name', advertiser.name)
    advertiser.company = request.json.get('company', advertiser.company)
    db.session.commit()
    return jsonify(advertiser.serialize()), 200

@api.route('/advertisers/<int:id>', methods=['DELETE'])
def delete_advertiser(id):
    advertiser = Advertisers.query.get(id)
    if not advertiser:
        return jsonify({'error': 'Advertiser not found'}), 404
    db.session.delete(advertiser)
    db.session.commit()
    return '', 204







