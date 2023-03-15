"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Reader, News, Keyword, KeywordsFavorites, NewsFavorites, Advertisers, Widget, WidgetFavorites
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)


@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user.serialize())


@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            password=data['password'],
            email=data['email'],
            birth_date=data['year, month, num_days'],
            gender=data['gender'],
            is_active=data['is_active']
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User created successfully', 'user': user.serialize()}), 201
    except KeyError as e:
        return jsonify({'error': f'Missing field: {e}'}), 400


@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    data = request.get_json()
    try:
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.password = data.get('password', user.password)
        user.email = data.get('email', user.email)
        user.birth_date = datetime.strptime(data.get('birth_date', user.birth_date.isoformat()), '%Y-%m-%d')
        user.gender = data.get('gender', user.gender)
        user.is_active = data.get('is_active', user.is_active)
        db.session.commit()
        return jsonify({'message': 'User updated successfully', 'user': user.serialize()})
    except KeyError as e:
        return jsonify({'error': f'Missing field: {e}'}), 400


@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully.'})

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

@api.route('/readers', methods=['POST'])
def create_reader():
    data = request.json
    user_id = data.get('user_id')

    if user_id is None:
        return jsonify({'error': 'User ID is required'}), 400

    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    reader = Reader(user_id=user_id)
    db.session.add(reader)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Reader already exists'}), 409

    return jsonify(reader.serialize()), 201

@api.route('/readers/<int:reader_id>', methods=['PUT'])
def update_reader(reader_id):
    data = request.json
    user_id = data.get('user_id')

    if user_id is None:
        return jsonify({'error': 'User ID is required'}), 400

    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    reader = Reader.query.get(reader_id)
    if reader is None:
        return jsonify({'error': 'Reader not found'}), 404

    reader.user_id = user_id
    db.session.commit()

    return jsonify(reader.serialize()), 200

@api.route('/readers/<int:reader_id>', methods=['DELETE'])
def delete_reader(reader_id):
    reader = Reader.query.get(reader_id)
    if reader is None:
        return jsonify({'error': 'Reader not found'}), 404

    db.session.delete(reader)
    db.session.commit()

    return jsonify({'message': 'Reader deleted successfully'}), 200

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
# Get a specific widget by ID
@api.route('/widgets/<int:id>', methods=['GET'])
def get_widget(id):
    widget = Widget.query.get(id)
    if not widget:
        return jsonify({'error': 'Widget not found'}), 404
    return jsonify(widget.serialize()), 200

@api.route('/widgets', methods=['POST'])
def add_widget():
    # Parse the JSON data from the request body
    data = request.json
    # Create a new instance of the Widget class using the parsed data
    new_widget = Widgets(
        name=data['name'],
        source=data['source'],
        url=data['url'],
        description=data['description'],
        type_widget=data['type_widget']
    )
    # Add the new widget to the database
    db.session.add(new_widget)
    db.session.commit()
    # Serialize the new widget and return it in the response
    serialized_widget = new_widget.serialize()
    return jsonify(serialized_widget), 201

# Update a widget by ID
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

# Delete a widget by ID
@api.route('/widgets/<int:id>', methods=['DELETE'])
def delete_widget(id):
    widget = Widget.query.get(id)
    if not widget:
        return jsonify({'error': 'Widget not found'}), 404
    db.session.delete(widget)
    db.session.commit()
    return jsonify({'message': 'Widget deleted successfully'}), 200
















