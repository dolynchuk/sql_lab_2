from flask import request, jsonify

from backend.backend.database import db
from backend.backend.groups import groups
from backend.backend.groups.models import Groups
from backend.backend.groups_users.models import GroupsUsers


@groups.route('/create', methods=['POST'])
def create():
    request_params = request.get_json()

    name = request_params.get('name')
    if not name:
        return 'ERROR'

    Groups.create(name)
    db.session.commit()
    return 'OK'


@groups.route('/get_group_by_id', methods=['POST'])
def get_group_by_id():
    request_params = request.get_json()

    group_id = request_params.get('groupId')

    if not group_id:
        return 'ERROR'

    group = Groups.query.get(group_id)

    return jsonify({
        'groupId': group.group_id,
        'name': group.name,
    })


@groups.route('/get_all')
def get_all():
    selected = db.session.execute('''
        SELECT 
            groups.name as name, 
            groups.group_id as group_id, 
            groups_users.user_id as user_id, 
            COUNT(groups_users.user_id) as users_count
        FROM groups 
        LEFT JOIN groups_users ON groups.group_id=groups_users.group_id 
        GROUP BY groups.group_id;
    ''')
    result = []
    for group in selected:
        result.append({
            'groupId': group.group_id,
            'name': group.name,
            'usersCount': group.users_count,
        })

    return jsonify(result)


@groups.route('/add', methods=['POST'])
def add():
    request_params = request.get_json()

    name = request_params.get('name')

    if not name:
        return 'ERROR'

    Groups.create(name)
    db.session.commit()

    return 'OK'


@groups.route('/get_groups_for_user', methods=['POST'])
def get_groups_for_user():
    request_params = request.get_json()
    user_id = request_params.get('userId')
    if not user_id:
        return 'ERROR'

    selected = db.session.execute('''
        SELECT
            groups.group_id,
            groups.name 
        FROM groups 
        LEFT JOIN groups_users ON groups.group_id=groups_users.group_id 
        WHERE groups_users.user_id={}
    '''.format(user_id))

    result = []
    for group in selected:
        result.append({
            'groupId': group.group_id,
            'name': group.name,
        })

    return jsonify(result)


@groups.route('/get_users_for_group', methods=['POST']) 
def get_users_for_group():
    request_params = request.get_json()
    group_id = request_params.get('groupId')
    if not group_id:
        return 'ERROR'

    selected = db.session.execute('''
        SELECT
            users.user_id,
            users.name,
            users.surname,
            users.age 
        FROM users 
        LEFT JOIN groups_users ON groups_users.user_id=users.user_id 
        WHERE groups_users.group_id={}
    '''.format(group_id))

    result = []
    for user in selected:
        result.append({
            'userId': user.user_id,
            'name': user.name,
            'surname': user.surname,
            'age': user.age
        })

    return jsonify(result)


@groups.route('/subscribe', methods=['POST'])
def subscribe():
    request_params = request.get_json()
    user_id = request_params.get('userId')
    group_name = request_params.get('groupName')

    if not user_id or not group_name:
        return 'ERROR'

    group_model = Groups.query.filter_by(name=group_name).first()
    GroupsUsers.create(group_model.group_id, user_id)
    db.session.commit()
    return 'OK'


@groups.route('/unsubscribe', methods=['POST'])
def unsubscribe():
    request_params = request.get_json()
    user_id = request_params.get('userId')
    group_name = request_params.get('groupName')

    if not user_id or not group_name:
        return 'ERROR'

    group_model = Groups.query.filter_by(name=group_name).first()
    groups_users_models = GroupsUsers.query.filter_by(
        group_id=group_model.group_id,
    ).all()

    for groups_users_model in groups_users_models:
        if groups_users_model.user_id == user_id:
            db.session.delete(groups_users_model)
            db.session.commit()

    return 'OK'


@groups.route('/delete', methods=['POST'])
def delete():
    request_params = request.get_json()
    group_id = request_params.get('groupId')
    if not group_id:
        return 'ERROR'

    group_model = Groups.query.get(group_id)
    if not group_model:
        return 'ERROR'

    groups_users_list = GroupsUsers.query.filter_by(
        group_id=group_id
    ).all()

    for groups_users_model in groups_users_list:
        db.session.delete(groups_users_model)

    db.session.delete(group_model)
    db.session.commit()
    return 'OK'


@groups.route('/update', methods=['POST'])
def update():
    request_params = request.get_json()
    group_id = request_params.get('groupId')
    name = request_params.get('name')

    if not group_id or not name:
        return 'ERROR'

    group_model = Groups.query.get(group_id)
    if not group_model:
        return 'ERROR'

    group_model.update(name)
    return 'OK'
