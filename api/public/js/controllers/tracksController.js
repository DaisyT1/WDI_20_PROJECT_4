angular.module('project4')
  .controller('TracksController', TracksController);

  TracksController.$inject = ["$http" , "$sce", "Spotify"];
  function TracksController($http , $sce, Spotify){
   
    var self = this;
    this.playThirty = playThirty;
    this.createPlaylist  = createPlaylist;


         $http({
           method: 'GET',
           url: 'https://api.spotify.com/v1/search?q=beyonce&type=album,track,artist'
         }).then(function successCallback(response) {

             self.results = response.data;
             // console.log(response.data.tracks.items.preview_url);

           }, function errorCallback(response) {
               // console.log(response);
           });
        
  function playThirty(){
    console.log('playThirty good to go')
  Spotify
    .getAlbum('0sNOF9WDwhWunNAHPD3Baj').then(function (data) {
    console.log(data);
  });
}
    function createPlaylist(){
      Spotify
        .createPlaylist('1176458919', { name: 'Awesome Mix Vol. 1' })
        .then(function (data) {
        console.log('playlist created');
      });
    }
  }