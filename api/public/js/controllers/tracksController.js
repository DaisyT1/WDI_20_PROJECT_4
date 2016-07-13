angular.module('project4')
  .controller('TracksController', TracksController);

  TracksController.$inject = ["$http" , "$sce", "Spotify"];
  function TracksController($http , $sce, Spotify){
   
    var self = this;
    this.searchSpotify = searchSpotify;
    this.createPlaylist  = createPlaylist;
    this.artistName = "";
    this.selectedArtist = '';
    this.selectTrack = selectTrack;

    // https://api.spotify.com/v1/search?q=beyonce&type=album,track,artist

function searchSpotify(){
  Spotify.search(self.artistName, 'artist').then(function (data) {
    self.selectedArtist = data;
  });
}

function createPlaylist(){
  Spotify
    .createPlaylist('1176458919', { name: 'Awesome Mix Vol. 1' })
    .then(function (data) {
    console.log('playlist created');
  });
}

function selectTrack(id){
  console.log(id)
}

  // searchSpotify()
}