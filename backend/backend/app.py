import os
from flask import Flask
from backend.backend.database import db
from backend.backend.users import users
from backend.backend.groups import groups

CONFIG = os.environ.get('CONFIG', 'Debug')


def create_app():
    app = Flask(__name__)
    app.config.from_object('backend.backend.settings.{}Config'.format(CONFIG))

    db.init_app(app)

    app.register_blueprint(users)
    app.register_blueprint(groups)

    return app
