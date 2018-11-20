class DebugConfig(object):
    DEBUG = True
    SECRET_KEY = 'secret_key'

    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = ''


class ProdConfig(DebugConfig):
    DEBUG = False
