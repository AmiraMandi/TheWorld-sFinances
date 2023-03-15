"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


# @app.route('/users', methods=['GET'])
# def get_users():
#     users = User.query.all()
#     return jsonify([user.serialize() for user in users])

# @app.route('/users/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = User.query.get(user_id)
#     if user is None:
#         return jsonify({"error": "User not found"}), 404
#     return jsonify(user.serialize())

# @app.route('/users', methods=['POST'])
# def create_user():
#     user_data = request.json
#     if not user_data:
#         return jsonify({"error": "No data provided"}), 400
#     user = User(**user_data)
#     db.session.add(user)
#     db.session.commit()
#     return jsonify(user.serialize()), 201

# @app.route('/users/<int:user_id>', methods=['PUT'])
# def update_user(user_id):
#     user_data = request.json
#     if not user_data:
#         return jsonify({"error": "No data provided"}), 400
#     user = User.query.get(user_id)
#     if user is None:
#         return jsonify({"error": "User not found"}), 404
#     for key, value in user_data.items():
#         setattr(user, key, value)
#     db.session.commit()
#     return jsonify(user.serialize())

# @app.route('/users/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     user = User.query.get(user_id)
#     if user is None:
#         return jsonify({"error": "User not found"}), 404
#     db.session.delete(user)
#     db.session.commit()
#     return jsonify({"message": "User deleted"})

# @app.route('/readers', methods=['GET'])
# def get_readers():
#     readers = Readers.query.all()
#     return jsonify([r.serialize() for r in readers])

# @app.route('/readers', methods=['POST'])
# def create_reader():
#     data = request.json
#     reader = Readers(
#         id_user=data['id_user'],
#         user_name=data['user_name'],
#         user_last_name=data['user_last_name'])
#     try:
#         db.session.add(reader)
#         db.session.commit()
#     except IntegrityError:
#         db.session.rollback()
#         return jsonify({'message': 'Reader already exists!'}), 409
#     return jsonify(reader.serialize()), 201

# @app.route('/readers/<int:id>', methods=['GET'])
# def get_reader(id):
#     reader = Readers.query.get_or_404(id)
#     return jsonify(reader.serialize())

# @app.route('/readers/<int:id>', methods=['PUT'])
# def update_reader(id):
#     data = request.json
#     reader = Readers.query.get_or_404(id)
#     reader.id_user = data['id_user']
#     reader.user_name = data['user_name']
#     reader.user_last_name = data['user_last_name']
#     try:
#         db.session.commit()
#     except IntegrityError:
#         db.session.rollback()
#         return jsonify({'message': 'Reader already exists!'}), 409
#     return jsonify(reader.serialize())

# @app.route('/readers/<int:id>', methods=['DELETE'])
# def delete_reader(id):
#     reader = Readers.query.get_or_404(id)
#     db.session.delete(reader)
#     db.session.commit()
#     return jsonify({'message': 'Reader has been deleted!'})

# if __name__ == '__main__':
#     app.run(debug=True)


