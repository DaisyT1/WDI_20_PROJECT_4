angular
  .module('project4')
  .factory('Track', Track);

Track.$inject = ['$resource'];
function Track($resource){

  return $resource(
    'http://localhost:3000/tracks/:id', {id: '@_id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' } }
  );
}
