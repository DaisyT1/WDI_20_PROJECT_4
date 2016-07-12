angular
  .module('project4', ['ngResource', 'ngMap', 'ui.router'])
  .config(Router);

Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {

 $stateProvider
  .state('home', {
    url: "/",
    templateUrl: "../views/home.html"
  })
  .state('map', {
    url: "/map",
    templateUrl: "../views/map.html"
  }) 
  .state('songs', {
    url: "/songs",
    templateUrl: "../views/songs.html"
  })
  .state('users', {
    url: "/users",
    templateUrl: "../views/users.html"
  })
  .state('login', {
    url: "/login",
    templateUrl: "../views/login.html"
  });

 $urlRouterProvider.otherwise('/');
}