class DebugConfig(object):
    DEBUG = True
    SECRET_KEY = 'secret_key'

    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://sql2266914:password@sql2.freemysqlhosting.net/sql2266914'


class ProdConfig(DebugConfig):
    DEBUG = False
