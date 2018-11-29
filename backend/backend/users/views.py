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
    city_id = request_params.get('cityId')
    gender_id = request_params.get('genderId')
    if not name or not surname or not age or not city_id or not gender_id:
        return 'ERROR'

    Users.create(name, surname, age, city_id, gender_id)
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
            'age': user.age,
            'cityId': user.city_id,
            'genderId': user.gender_id
        })

    return jsonify(result)


@users.route('/add', methods=['POST'])
def add():
    request_params = request.get_json()

    name = request_params.get('name')
    surname = request_params.get('surname')
    age = request_params.get('age')
    city_id = request_params.get('cityId')
    gender_id = request_params.get('genderId')

    if not name or not surname or not age or not city_id or not gender_id:
        return 'ERROR'

    Users.create(name, surname, age, city_id, gender_id)
    db.session.commit()

    return 'OK'


@users.route('/get_users_with_similar_subscriptions_count', methods=['POST', 'GET'])
def get_users_with_similar_subscriptions_count():
    request_params = request.get_json()
    min = request_params.get('min') or 0

    selected = db.session.execute('''
         SELECT GROUP_CONCAT(COALESCE(CONCAT(x.name, ' ' ,x.surname),'') SEPARATOR ', ') as string, x.groups_count FROM (
            SELECT 
                u_1.user_id,
                u_1.name,
                u_1.surname,
                count(gu_1.group_id) as groups_count 
            FROM users AS u_1 
            JOIN groups_users AS gu_1 ON gu_1.user_id = u_1.user_id 
            WHERE gu_1.group_id IN (
                SELECT gu.group_id FROM users AS u 
                JOIN groups_users AS gu ON gu.user_id = u.user_id
            )
            GROUP BY u_1.user_id
        ) as x 
        GROUP BY x.groups_count 
        HAVING count(*) > 1 AND x.groups_count >= {min};
    '''.format(min=min))

    result = []
    for users_pair_data in selected:
        result.append({
            'users': str(users_pair_data.string).split(', '),
            'count': users_pair_data.groups_count
        })

    return jsonify(result)


@users.route('/get_full_subscribers', methods=['POST', 'GET'])
def get_full_subscribers():
    selected = db.session.execute('''
        SELECT
            users.user_id,
            users.name,
            users.surname,
            users.age,
            users.city_id,
            users.gender_id 
        FROM users 
        LEFT JOIN groups_users ON users.user_id=groups_users.user_id 
        GROUP BY users.user_id 
        HAVING COUNT(*) = (
            SELECT COUNT(*) FROM groups
        )
    ''')

    result = []
    for user in selected:
        result.append({
            'userId': user.user_id,
            'name': user.name,
            'surname': user.surname,
            'age': user.age,
            'cityId': user.city_id,
            'genderId': user.gender_id,
        })

    return jsonify(result)




@users.route('/get_similar', methods=['POST'])
def get_similar():
    request_params = request.get_json()

    user_id = request_params.get('userId')
    if not user_id:
        return 'ERROR'

    selected = db.session.execute('''
        SELECT 
            Y.user_id,
            Y.name,
            Y.surname,
            Y.age,
            Y.city_id,
            Y.gender_id,
            Y.count
        FROM  (
            SELECT
                X.user_id,
                X.name,
                X.surname,
                X.age,
                X.city_id,
                X.gender_id,
                groups_users.group_id,
                COUNT(*) as count
            FROM
                (
                    SELECT 
                        users.user_id,
                        users.name,
                        users.surname,
                        users.age,
                        users.city_id,
                        users.gender_id
                    FROM users
                    LEFT JOIN groups_users as GU ON GU.user_id = users.user_id 
                    GROUP BY users.user_id
                ) as X
                LEFT JOIN groups_users ON groups_users.user_id = X.user_id
                GROUP BY X.user_id
                HAVING groups_users.group_id IN (
                SELECT groups_users.group_id FROM groups_users
                JOIN users ON users.user_id = groups_users.user_id
                WHERE users.user_id={user_id}
            )
        ) as Y WHERE count = (
            SELECT
                COUNT(*) 
            FROM users
            LEFT JOIN groups_users ON users.user_id = groups_users.user_id
            WHERE users.user_id = {user_id}
        ) AND Y.user_id != {user_id}
    '''.format(user_id=user_id))

    result = []
    for user in selected:
        result.append({
            'userId': user.user_id,
            'name': user.name,
            'surname': user.surname,
            'age': user.age,
            'cityId': user.city_id,
            'genderId': user.gender_id,
        })

    return jsonify(result)


@users.route('/get_cities')
def get_cities():
    selected = db.session.execute('''
        SELECT 
            name
        FROM cities
        ORDER BY city_id
    ''')

    result = []
    for row in selected:
        result.append(row.name)

    return jsonify(result)


@users.route('/get_genders')
def get_genders():
    selected = db.session.execute('''
        SELECT 
            name
        FROM genders
        ORDER BY gender_id
    ''')

    result = []
    for row in selected:
        result.append(row.name)

    return jsonify(result)


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
        'age': user.age,
        'cityId': user.city_id,
        'genderId': user.gender_id,
    })


@users.route('/update', methods=['POST'])
def update():
    request_params = request.get_json()
    user_id = request_params.get('userId')
    name = request_params.get('name')
    surname = request_params.get('surname')
    age = request_params.get('age')
    city_id = request_params.get('cityId')
    gender_id = request_params.get('genderId')

    if not user_id or not name or not surname or not age or not city_id or not gender_id:
        return 'ERROR'

    user_model = Users.query.get(user_id)
    if not user_model:
        return 'ERROR'

    user_model.update(name, surname, age, city_id, gender_id)
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

    GroupsUsers.query.filter_by(
        user_id=user_id
    ).delete()

    db.session.delete(user_model)
    db.session.commit()
    return 'OK'
