"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_limiter import Limiter
from api.models import db, User, Reader, News, Keyword, KeywordsFavorites, NewsFavorites, Advertisers, Widget, WidgetFavorites
from api.utils import generate_sitemap, APIException
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import json, bcrypt
import re
import requests

# limiter = Limiter(app, key_func=get_remote_address)
# limiter.init_app(app)


api = Flask(__name__)
api = Blueprint('api', __name__)

api.secret_key = 'secretkey' #parte  login
PASSWORD_REGEX = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')

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
    print(request.json)
    email = request.json('email')
    password = request.json('password')
    is_active = request.json('is_active')
    user = User(email=email, password=password, is_active=is_active)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201


@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    data = request.get_json()
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    user.is_active = data.get('is_active', user.is_active)

    db.session.commit()

    return jsonify(user.serialize()), 200


# delete funciona
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
@api.route('/reader', methods=['GET'])
def get_all_readers():
    readers = Reader.query.all()
    return jsonify([r.serialize() for r in readers]), 200


@api.route('/reader/<int:user_id>', methods=['GET'])
def get_reader(user_id):
    reader = Reader.query.get(user_id)
    if reader is None:
        return jsonify({'error': 'Reader not found'}), 404

    return jsonify(reader.serialize()), 200

@api.route('/reader', methods=['POST'])
def create():
    print(request.json)
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

@api.route('/reader/<int:reader_id>', methods=['PUT'])
def update_reader(reader_id):
    reader = Reader.query.get(reader_id)
    if not reader:
        return jsonify({'message': 'Reader not found'}), 404
    print(reader_id)
    data = request.get_json()
    reader.first_name = data.get('first_name', reader.first_name)
    reader.last_name = data.get('last_name', reader.last_name)
    reader.birth_date = data.get('birth_date', reader.birth_date)
    # reader.gender = data.get('gender', reader.gender)

    db.session.commit()

    return jsonify(reader.serialize()), 200

@api.route('/readers/<int:user_id>', methods=['DELETE'])
def delete_reader(user_id):
    reader = Reader.query.get(user_id)
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

@api.route('/keywordsfavorites/<int:id>', methods=['GET'])
def get_keywordsfavorites(id):
    keywordsfavorites = KeywordsFavorites.query.get(id)
    if not keywordsfavorites:
        return jsonify({'error': 'KeywordsFavorites not found'}), 404
    return jsonify(keywordsfavorites.serialize()), 200

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



@api.route('/keywordsfavorites/<int:id>', methods=['DELETE'])
def delete_keywordsfavorites(id):
    keywordsfavorites = KeywordsFavorites.query.get(id)
    if not keywordsfavorites:
        return jsonify({'error': 'KeywordsFavorites not found'}), 404
    db.session.delete(keywordsfavorites)
    db.session.commit()
    return jsonify({'message': 'KeywordsFavorites deleted successfully'}), 200


# ENDPOINT KEYWORD
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


@api.route('/keywords', methods=['POST'])
def create_keyword():
    data = request.get_json()
    keyword = data.get('keyword')
    description = data.get('description')

    if not keyword or not description:
        return jsonify({'message': 'Keyword and description are required'}), 400

    if Keyword.query.filter_by(keyword=keyword).first():
        return jsonify({'message': 'Keyword already exists'}), 409

    new_keyword = Keyword(keyword=keyword, description=description)

    db.session.add(new_keyword)
    db.session.commit()

    return jsonify(new_keyword.serialize()), 201


@api.route('/keyword/<int:id>', methods=['PUT'])
def update_keyword(id):
    keyword = Keyword.query.get(id)
    if not keyword:
        return "Keyword not found.", 404

    data = request.get_json()
    keyword.keyword = data.get('keyword', keyword.keyword)
    keyword.description = data.get('description', keyword.description)
    db.session.commit()

    return jsonify(keyword.serialize()), 200



@api.route('/keyword/<int:id>', methods=['DELETE'])
def delete_keyword(id):
    keyword = Keyword.query.get(id)
    if keyword:
        db.session.delete(keyword)
        db.session.commit()
        return f"Keyword with id {id} deleted.", 200
    else:
        return "Keyword not found.", 404


# ENDPOINT WIDGETS
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

@api.route('/widgets/<int:id>', methods=['DELETE'])
def delete_widget(id):
    try:
        widget = Widget.query.get(id)
        if widget:
            db.session.delete(widget)
            db.session.commit()
            return jsonify({'message': 'Widget deleted successfully.'}), 200
        else:
            return jsonify({'error': 'Widget not found.'}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.session.close()

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

@api.route('/widget_favorites', methods=['GET'])
def get_widget_favorites1():
    widget_favorites = WidgetFavorites.query.all()
    return jsonify([w.serialize() for w in widget_favorites]) 

@api.route('/widget_favorites/<int:id>', methods=['GET'])
def get_widget_favorites(id):
    widget_favorites = WidgetFavorites.query.get(id)
    if widget_favorites:
        return jsonify(widget_favorites.serialize())
    else:
        return jsonify({'error': 'WidgetFavorites not found'}), 404

@api.route('/widget_favorites/<int:id>', methods=['DELETE'])
def delete_widget_favorites(id):
    widget_favorites = WidgetFavorites.query.get(id)
    if widget_favorites:
        db.session.delete(widget_favorites)
        db.session.commit()
        return jsonify({'message': 'WidgetFavorites deleted successfully'})
    else:
        return jsonify({'error': 'WidgetFavorites not found'}), 404


# ENDPOINT NEWS
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



@api.route('/news/<int:news_id>', methods=['DELETE'])
def delete_news(news_id):
    news = News.query.get(news_id)
    if news:
        db.session.delete(news)
        db.session.commit()
        return jsonify({"message": "News deleted successfully"})
    else:
        return jsonify({"message": "News not found"}), 404


# ENDPOINT NEW FAVORITE
@api.route('/news_favorites', methods=['GET'])
def get_all_news_favorites():
    news_favs = NewsFavorites.query.all()
    return jsonify([nf.serialize() for nf in news_favs])


@api.route('/news_favorites/<int:id>', methods=['GET'])
def news_favorites(id):
    news_fav = NewsFavorites.query.get(id)
    if not news_fav:
        return jsonify({'error': 'NewsFavorites not found'}), 404

    return jsonify(news_fav.serialize())

@api.route('/news_favorites/<int:id>', methods=['DELETE'])
def delete_news_favorite(id):
    news_favorite = NewsFavorites.query.get(id)
    if news_favorite:
        db.session.delete(news_favorite)
        db.session.commit()
        return jsonify({'message': 'NewsFavorite deleted successfully'})
    else:
        return jsonify({'error': 'NewsFavorite not found'}), 404
# ENDPOINT ADVERTISERS
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

@api.route('/<int:id>', methods=['PUT'])
def update_advertiser(id):
    data = request.get_json()
    try:
        advertiser = Advertisers.query.get(id)
        if advertiser:
            advertiser.user_id = data.get('user_id', advertiser.user_id)
            advertiser.name = data.get('name', advertiser.name)
            advertiser.last_name = data.get('last_name', advertiser.last_name)
            advertiser.company = data.get('company', advertiser.company)
            advertiser.company_address = data.get('company_address', advertiser.company_address)
            advertiser.CIF_NIF = data.get('CIF_NIF', advertiser.CIF_NIF)
            db.session.commit()
            return jsonify(advertiser.serialize())
        else:
            return 'Advertiser not found', 404
    except SQLAlchemyError as e:
        return str(e), 500


@api.route('/advertisers/<int:id>', methods=['DELETE'])
def delete_advertiser(id):
    advertiser = Advertisers.query.get(id)
    if not advertiser:
        return jsonify({'error': 'Advertiser not found'}), 404
    db.session.delete(advertiser)
    db.session.commit()
    return '', 204


@api.route('/login', methods=['POST', 'DELETE'])
# @Limiter.limit("10 per minute")
def login():
    if request.method == 'POST':
        email = request.json.get('email')
        password = request.json.get('password')

        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({"msg": "User does not exist"}), 404
        
    # Si el email o password no coindicen retornamos error de autentificacion
        if email != user.email or not current_app.bcrypt.check_password_hash(
            user.password, password):
            return jsonify({"msg": "Bad username or password"}), 401


        access_token = {
        "token": create_access_token(identity=email)
    }
        
        return jsonify(access_token)

        # if user and bcrypt.checkpw(password.encode('utf-8'), user.password_hash):
        #     # Store the user ID in a session to indicate that they are logged in
        #     session['user_id'] = user.id
        #     return jsonify({'message': 'Login successful'})
        # else:
        #     # time.sleep(2)  # delay response by 2 seconds to slow down brute force attacks
        #     return jsonify({'message': 'Invalid email or password'}), 401


    elif request.method == 'DELETE':
        # Check if the user is logged in by checking if their ID is in the session
        if 'user_id' in session:
            # Remove the user's ID from the session to log them out
            session.pop('user_id', None)
            return jsonify({'message': 'Logout successful'})
        else:
            return jsonify({'message': 'User is not logged in'}), 401


@api.route('/login', methods=['GET'])
def get_login():
    return jsonify({'message': 'Please use POST method to log in'})

@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')
    is_active = True
    hashed_password = current_app.bcrypt.generate_password_hash(
        password
    ).decode("utf-8")
    

    # Check if user already exists
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'message': 'User already exists'}), 409

    # Hash the password using bcrypt
    # password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    # password_hash = password_hash en linea 475
    # Create a new user
    new_user = User(email=email, password=hashed_password, is_active=is_active)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

# restablecer contraseña por mail
@api.route("/recuperarPassword", methods=["POST"])
def recuperarPassword():
    # Recibimos los datos del front
    body = json.loads(request.data)
    email = body["email"]
    # Creamos password de forma aleatoria
    new_password = "".join(random.choice(string.ascii_uppercase + string.digits)for x in range(10))
    # Hash password
    hashed_password = current_app.bcrypt.generate_password_hash(new_password).decode("utf-8")
    # Almacenamos la info del user con el email recibido
    user = User.query.filter_by(email=email).first()
    # Asignamos el nuevo password generado aleatoriamente al usuario
    if user != None:
        user.password = hashed_password
        db.session.commit()

        mail = Mail() 
        msg = Message('Password Recovery', sender='The Worlds Finances', recipients=[user.email])
        msg.body = "Hello " + user.name + ", your new password is " + new_password + "."
        msg.html = "<h1>The World Finances</h1><h2>Hello " + user.name + "</h2><p>Your new password is <b>" + new_password + "</b></p><p>If you did not request this password change, please ignore and delete this message.</p><p>Message sent automatically, do not reply.</p>"
        mail.send(msg)
        return "Message sent!"

    else:
        return jsonify({"msg": "The entered email is not registered"}), 400



# Mediastack GET
@api.route('/newsmediastack', methods=['GET'])
def get_newsmediastack():
    # url = 'http://api.mediastack.com/v1/news?access_key=4a32d807e8f096e6c57661d4576ea097'
    category = request.args.get('category', default='business')
    keywords = request.args.get('keywords', default='')
    print("las categorias", category)
    # ToDo: Recibir en el body "category", si category está vacío, no hacer nada, y sino asignarle el valor enviado a la variable "category"

    # optional parameters
    params = {
        'languages': 'en',   # retrieve English news only
        'categories': category,  # retrieve news in the 'general' category only
        'keywords': keywords, #keywords are null at first
        'sort': 'published_desc', # sort by published time in descending order
        'limit': 10 # retrieve 10 news articles only
    }

    response = requests.get(url, params=params,)
    
    if response.status_code == 200:
        response_body = response.json()
        # response_body = {
        #     "message": "Georgi devuelve noticias",
        #     "data": news_data
        # }
        return jsonify(response_body), 200
    else:
        return 'Error retrieving news data from the API', response.status_code



