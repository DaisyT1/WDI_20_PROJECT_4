angular.module('project4')
  .controller('LocationsController', LocationsController);

LocationsController.$inject = ['NgMap', 'LocationResource', 'Track' , '$sce', 'Spotify']
function LocationsController(NgMap, LocationResource, Track , $sce, Spotify){

  var self = this;

  self.all            = [];
  self.addLocation    = addLocation;
  self.placeChanged   = placeChanged;
  self.location       = null;
  self.selectedSongId = null;
  self.locationFound = locationFound;
  self.playlistURL;



  var vm = this;
  vm.selectedArtist = '';

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
    // var white = "&theme=white"
    var url = "https://embed.spotify.com/?uri=spotify:trackset:";
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
    self.locationFound()
  }

  vm.addSongToLocation = function(id){
    self.selectedSongId = id;
    console.log("THE ID IS:")
    console.log(self.selectedSongId)
  }

  vm.location = vm.all[0]

  vm.showDetail = function(e, location) {
    vm.location = location;
    vm.map.showInfoWindow('marker-info', this);
    Spotify.getTrack(location.song.spotID).then(function (data) {
      vm.selectedArtist = data;
      console.log(vm.selectedArtist)
      // console.log(data);
    });
    // console.log(vm.selectedArtist.name)
  };

  vm.hideDetail = function() {
    vm.map.hideInfoWindow('marker-info');
  };

  vm.style = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}];

  vm.height = "400px";

} //END