export default class UsersAPI {
  static getAllUsers = () => (
    fetch('/api/users/get_all')
  );

  static addUser = params => (
    fetch('/api/users/add', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );

  static getUsersWithSimilarSubscriptionsCount = params => (
    fetch('/api/users/get_users_with_similar_subscriptions_count', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );

  static getSimilar = params => (
    fetch('/api/users/get_similar', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );

  static getUserById = params => (
    fetch('/api/users/get_user_by_id', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );

  static updateUser = params => (
    fetch('/api/users/update', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );

  static deleteUser = params => (
   fetch('/api/users/delete', {
     method: 'POST',
     body: JSON.stringify(params),
     headers: {
       'Content-type': 'application/json',
     },
   })
  );

  static getGroupsForUser = params => (
    fetch('/api/groups/get_groups_for_user', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );
}
