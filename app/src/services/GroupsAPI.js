export default class API {
   static getAllGroups = () => (
    fetch('/api/groups/get_all')
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
