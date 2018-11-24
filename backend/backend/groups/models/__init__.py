from backend.backend.database import db


class Groups(db.Model):
    __tablename__ = 'groups'

    group_id = db.Column(db.INT, primary_key=True)
    name = db.Column(db.VARCHAR)

    @classmethod
    def create(cls, name):
        new_group = cls(
            name=name,
        )
        db.session.add(new_group)
        return new_group
