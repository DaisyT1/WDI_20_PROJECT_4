angular
  .module('project4')
  .factory('User', User);

User.$inject = ['$resource'];
function User($resource){

  return $resource(
    '/users/:id', {id: '@_id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' } }
  );
}

