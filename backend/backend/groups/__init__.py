from flask import Blueprint


groups = Blueprint(
    'groups',
    __name__,
    url_prefix='/api/groups'
)

from . import views
