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



