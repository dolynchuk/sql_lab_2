from flask import request

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
    user_id = request_params.get('user_id')

    group = Groups.query.filter_by(
        name=group_name
    ).first()

    user = Users.query.get(user_id)

    if not group or not user:
        return 'ERROR'

    GroupsUsers.create(group.group_id, user.user_id)
    db.session.commit()

    return 'OK'
