angular.module('project4')
  .controller('LocationsController', LocationsController);

LocationsController.$inject = ['NgMap', 'LocationResource', 'Track' , '$sce']
function LocationsController(NgMap, LocationResource, Track , $sce){

  var self = this;

  self.all            = [];
  self.addLocation    = addLocation;
  self.placeChanged   = placeChanged;
  self.location       = null;
  self.selectedSongId = null;
  self.locationFound = locationFound;
  self.playlistURL;;


  var vm = this;

  NgMap.getMap().then(function(map) {
    vm.map = map;
  });

  function locationFound() {



      var bounds = vm.map.getBounds();
      var ne = bounds.getNorthEast(); // LatLng of the north-east corner
      var sw = bounds.getSouthWest(); // LatLng of the south-west corder

      self.all = LocationResource.query({top:ne.lat() , bottom: sw.lat() , left:sw.lng() , right:ne.lng()} , function(){

       self.getPlaylistURL();

      });

  }

  function addLocation() {
    self.location.address = self.address;
    Location.save({ location: self.location }), function(response){
      self.location = null;
    }
  }

  self.getPlaylistURL = function() {

      var url = "https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE";

      angular.forEach(self.all , function(item, index){ 

          if(item.song)
            url += item.song.spotID + ",";

      });

      self.playlistURL = url;

  }

  function placeChanged() {
    console.log("Running");
    self.place = this.getPlace();
    self.map.setCenter(self.place.geometry.location);
  }

  vm.addSongToLocation = function(id){
    self.selectedSongId = id;
    console.log("THE ID IS:")
    console.log(self.selectedSongId)
  }

} 