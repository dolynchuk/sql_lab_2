export default class API {
  static getAllUsers = () => (
    fetch('/api/users/get_all')
  );

   static getAllGroups = () => (
    fetch('/api/groups/get_all')
  );
}
