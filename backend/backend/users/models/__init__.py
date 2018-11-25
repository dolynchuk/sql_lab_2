from backend.backend.database import db


class Users(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.INT, primary_key=True)
    name = db.Column(db.VARCHAR)
    surname = db.Column(db.VARCHAR)
    age = db.Column(db.INT)

    @classmethod
    def create(cls, name, surname, age):
        new_user = cls(
            name=name,
            surname=surname,
            age=age
        )
        db.session.add(new_user)
        return new_user

    def update(self, name, surname, age):
        if not name or not surname or not age:
            return 'ERROR'

        self.name = name
        self.surname = surname
        self.age = age
        db.session.commit()

        return 'OK'
