angular
  .module('project4', ['ngResource', 'ngMap', 'ui.router', 'spotify'])
  .config(Router);

Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {

 $stateProvider
  .state('home', {
    url: "/",
    templateUrl: "../views/home.html"
  })
  .state('songs', {
    url: "/songs",
    templateUrl: "../views/songs.html"
  })
  .state('users', {
    url: "/users",
    templateUrl: "../views/users.html"
  })
  .state('locations', {
    url: "/locations",
    templateUrl: "../views/locations/index.html",
    controller: "LocationsController as vm"
  }) 
  .state('location', {
    url: "/locations/new",
    templateUrl: "../views/locations/new.html",
    controller: "LocationsController as vm"
  })
  .state('login', {
    url: "/login",
    templateUrl: "../views/login.html"
  });

 $urlRouterProvider.otherwise('/');
}