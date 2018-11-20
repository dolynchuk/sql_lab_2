import os
from flask import Flask


CONFIG = os.environ.get('CONFIG', 'Debug')


def create_app():
    app = Flask(__name__)
    app.config.from_object('backend.backend.settings.{}Config'.format(CONFIG))

    return app
