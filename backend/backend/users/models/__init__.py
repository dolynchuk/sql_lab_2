from backend.backend.database import db


class Users(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.INT, primary_key=True)
    name = db.Column(db.VARCHAR)
    surname = db.Column(db.VARCHAR)
    age = db.Column(db.INT)
    city_id = db.Column(db.INT)
    gender_id = db.Column(db.INT)

    @classmethod
    def create(cls, name, surname, age, city_id, gender_id):
        new_user = cls(
            name=name,
            surname=surname,
            age=age,
            city_id=city_id,
            gender_id=gender_id
        )
        db.session.add(new_user)
        return new_user

    def update(self, name, surname, age, city_id, gender_id):
        if not name or not surname or not age or not city_id or not gender_id:
            return 'ERROR'

        self.name = name
        self.surname = surname
        self.age = age
        self.city_id = city_id
        self.gender_id = gender_id
        db.session.commit()

        return 'OK'
