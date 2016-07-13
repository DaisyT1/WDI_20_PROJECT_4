angular.module('project4')
  .controller('LocationsController', LocationsController);

  LocationsController.$inject = ["$http"]
  function LocationsController($http){

    var self = this;
    this.all = [];
    this.getLocations = getLocations;
    this.newLocation = {};
    this.addLocation = addLocation;
    this.location = 

  function getLocations(){
    $http
    .get("http://localhost:3000/locations").then(function(response){
    self.all = response.data.locations;
      console.log(self)
    });
  }

  function addLocation(){
    this.newLocation.lat = 
    this.newLocation.lng = 

    $http.post("http://localhost:3000/locations" , this.newLocation).then(function(response){
      self.all.push(response.data.location);
      self.newLocation = {};
      console.log(self)
    });
  }

  getLocations();
}