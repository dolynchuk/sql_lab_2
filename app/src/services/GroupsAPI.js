export default class API {
  static getAllGroups = () => (
    fetch('/api/groups/get_all')
  );

  static getGroupsWithSubscribersAgeMin = params => (
    fetch('/api/groups/get_groups_with_subscribers_age_min', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );

  static getGroupById = params => (
    fetch('/api/groups/get_group_by_id', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );

  static updateGroup = params => (
    fetch('/api/groups/update', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );
  
  static deleteGroup = params => (
    fetch('/api/groups/delete', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );

  static getUsersForGroup = params => (
    fetch('/api/groups/get_users_for_group', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );

  static addGroup = params => (
    fetch('/api/groups/add', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );

  static subscribe = params => (
    fetch('/api/groups/subscribe', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );

  static unsubscribe = params => (
    fetch('/api/groups/unsubscribe', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    })
  );
}
