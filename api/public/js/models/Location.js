angular
  .module('project4')
  .factory('LocationResource', LocationResource);

Location.$inject = ['$resource'];
function LocationResource($resource){

  return $resource(
    'http://localhost:3000/locations/:id', {id: '@_id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' } }
  );
}

