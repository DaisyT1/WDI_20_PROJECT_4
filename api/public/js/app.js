angular
  .module('project4', ['ngResource', 'ngMap', 'ui.router', 'spotify'])
  .config(Router)
  .filter('trustAsResourceUrl', ['$sce', function($sce) {
      return function(val) {
          return $sce.trustAsResourceUrl(val);
      };
  }]);

Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {

 $stateProvider
  .state('home', {
    url: "/",
    templateUrl: "../views/home.html"
  })
  .state('locations', {
    url: "/locations",
    templateUrl: "../views/locations/index.html",
    controller: "LocationsController as vm"
  }) 
  .state('location', {
    url: "/locations/new",
    templateUrl: "../views/locations/new.html",
    controller: "NewController as controller"
  })
  .state('login', {
    url: "/login",
    templateUrl: "../views/login.html"
  });

 $urlRouterProvider.otherwise('/');
}