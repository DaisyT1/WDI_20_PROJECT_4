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
  }

  vm.addSongToLocation = function(id){
    self.selectedSongId = id;
    console.log("THE ID IS:")
    console.log(self.selectedSongId)
  }

  // Spotify
  //   .createPlaylist('1176458919', { name: 'Awesome Mix Vol. 1' })
  //   .then(function (data) {
  //    console.log('playlist created');
  //   });

  // Spotify
  //   .addPlaylistTracks('1176458919', '2TkWjGCu8jurholsfdWtG4', 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M')
  //   .then(function (data) {
  //     console.log('tracks added to playlist');
  //   });

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

} //END