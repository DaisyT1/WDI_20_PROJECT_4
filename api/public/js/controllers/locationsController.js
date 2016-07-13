angular.module('project4')
  .controller('LocationsController', LocationsController);

LocationsController.$inject = ['NgMap', 'Location']
function LocationsController(NgMap, Location){

  var self = this;

  self.all          = Location.query();
  self.location     = null;
  self.addLocation  = addLocation;
  self.placeChanged = placeChanged;

  function addLocation() {
    self.location.address = self.address

    Location.save({ location: self.location }), function(response){
      self.location = null;
    }
  }

  function placeChanged() {
    console.log("Running");
    self.place = this.getPlace();
    self.map.setCenter(self.place.geometry.location);
  }

  NgMap.getMap().then(function(map) {
    self.map = map;
  });

  function addSongToLocation(){

  }

} 