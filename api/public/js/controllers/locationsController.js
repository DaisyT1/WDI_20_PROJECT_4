angular.module('project4')
  .controller('LocationsController', LocationsController);

LocationsController.$inject = ['NgMap', 'Location', 'Track']
function LocationsController(NgMap, Location, Track){

  var self = this;

  self.all          = Location.query();
  self.location     = null;
  self.addLocation  = addLocation;
  self.placeChanged = placeChanged;
  self.selectedSongId = null;



  var vm = this;

  NgMap.getMap().then(function(map) {
    vm.map = map;
  });


  vm.clicked = function() {
      alert('Clicked a link inside infoWindow');
    };

    vm.shops = [
      {id:'foo', name: 'FOO SHOP', position:[41,-87]},
      {id:'bar', name: 'BAR SHOP', position:[42,-86]}
    ];
    vm.shop = vm.shops[0];

    vm.showDetail = function(e, shop) {
      vm.shop = shop;
      vm.map.showInfoWindow('infoWindow', shop.id);
    };

    vm.hideDetail = function() {
      vm.map.hideInfoWindow('infoWindow');
    };


  function addLocation() {
    self.location.testID = self.selectedSongId; 
    self.location.address = self.address
    // self.location.song
    Location.save({ location: self.location }), function(response){
      console.log(response)
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

  vm.addSongToLocation = function(id){
    self.selectedSongId = id;
    console.log("THE ID IS:")
    console.log(self.selectedSongId)
  }

} 