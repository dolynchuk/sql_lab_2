from flask import request

from backend.backend.database import db
from backend.backend.groups import groups
from backend.backend.groups.models import Groups


@groups.route('/create', methods=['POST'])
def create():
    request_params = request.get_json()

    name = request_params.get('name')
    if not name:
        return 'ERROR'

    Groups.create(name)
    db.session.commit()
    return 'OK'
