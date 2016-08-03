angular.module('project4')
  .controller('TracksController', TracksController);

  TracksController.$inject = ['NgMap', "$http" , "$sce", "Spotify", "Track", "$scope"];
  function TracksController(NgMap, $http , $sce, Spotify, Track, $scope){
   
    var self = this;
    this.searchSpotify    = searchSpotify;
    this.createPlaylist   = createPlaylist;
    this.saveTrack        = saveTrack;
    this.artistName       = "";
    this.selectedArtist   = '';
    this.selectTrack      = selectTrack;
    this.selectedId       = null;
    this.placeChanged     = placeChanged;

  NgMap.getMap().then(function(map) {
    vm.map = map;
  });

  function addSong() {
    self.tracks.spotId = self.selectedId;
    Track.save({ tracks: self.track }), function(response){
      self.selectedId = null;
    }
  }

  function searchSpotify(){
    Spotify.search(self.artistName, 'track').then(function (data) {
      self.selectedArtist = data;
      console.log(data)
    });
  }

  function selectTrack(id){
    self.selectedId = id
    console.log(id)
    console.log(self.selectedId)
  }

  function createPlaylist(){
   Spotify
     .createPlaylist('USER-ID', { name: 'Awesome Mix Vol. 1' })
     .then(function (data) {
      console.log('playlist created');
    });
  }

  function placeChanged() {
    console.log("Running");
    self.place = this.getPlace();
    self.map.setCenter(self.place.geometry.location);
  }
}