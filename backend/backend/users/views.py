from flask import request, jsonify

from backend.backend.database import db
from backend.backend.users import users
from backend.backend.users.models import Users
from backend.backend.groups.models import Groups
from backend.backend.groups_users.models import GroupsUsers


@users.route('/create', methods=['POST'])
def create():
    request_params = request.get_json()

    name = request_params.get('name')
    surname = request_params.get('surname')
    age = request_params.get('age')
    if not name or not surname or not age:
        return 'ERROR'

    Users.create(name, surname, age)
    db.session.commit()
    return 'OK'


@users.route('/join_group', methods=['POST'])
def join_group():
    request_params = request.get_json()

    group_name = request_params.get('group_name')
    user_id = request_params.get('userId')

    group = Groups.query.filter_by(
        name=group_name
    ).first()

    user = Users.query.get(user_id)

    if not group or not user:
        return 'ERROR'

    GroupsUsers.create(group.group_id, user.user_id)
    db.session.commit()

    return 'OK'


@users.route('/get_all')
def get_all():
    selected = Users.query.limit(100).all()
    result = []
    for user in selected:
        result.append({
            'userId': user.user_id,
            'name': user.name,
            'surname': user.surname,
            'age': user.age
        })

    return jsonify(result)


@users.route('/add', methods=['POST'])
def add():
    request_params = request.get_json()

    name = request_params.get('name')
    surname = request_params.get('surname')
    age = request_params.get('age')

    if not name or not surname or not age:
        return 'ERROR'

    Users.create(name, surname, age)
    db.session.commit()

    return 'OK'


@users.route('/get_user_by_id', methods=['POST'])
def get_user_by_id():
    request_params = request.get_json()

    user_id = request_params.get('userId')

    if not user_id:
        return 'ERROR'

    user = Users.query.get(user_id)

    return jsonify({
        'userId': user.user_id,
        'name': user.name,
        'surname': user.surname,
        'age': user.age
    })


@users.route('/update', methods=['POST'])
def update():
    request_params = request.get_json()
    user_id = request_params.get('userId')
    name = request_params.get('name')
    surname = request_params.get('surname')
    age = request_params.get('age')

    if not user_id or not name or not surname or not age:
        return 'ERROR'

    user_model = Users.query.get(user_id)
    if not user_model:
        return 'ERROR'

    user_model.update(name, surname, age)
    return 'OK'


@users.route('/delete', methods=['POST'])
def delete():
    request_params = request.get_json()
    user_id = request_params.get('userId')
    if not user_id:
        return 'ERROR'

    user_model = Users.query.get(user_id)
    if not user_model:
        return 'ERROR'

    groups_users_list = GroupsUsers.query.filter_by(
        user_id=user_id
    ).all()

    for groups_users_model in groups_users_list:
        db.session.delete(groups_users_model)

    db.session.delete(user_model)
    db.session.commit()
    return 'OK'
