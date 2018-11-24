from backend.backend.database import db


class GroupsUsers(db.Model):
    __tablename__ = 'groups_users'

    groups_users_id = db.Column(db.INT, primary_key=True)
    user_id = db.Column(db.INT)
    group_id = db.Column(db.INT)

    @classmethod
    def create(cls, group_id, user_id):
        new_groups_users = cls(
            group_id=group_id,
            user_id=user_id,
        )
        db.session.add(new_groups_users)
        return new_groups_users
