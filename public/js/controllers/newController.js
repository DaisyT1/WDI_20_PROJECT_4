angular.module('project4')
.controller('NewController' , NewController);


NewController.$inject = ['NgMap', 'LocationResource' ,'Spotify'];

  function NewController(NgMap, LocationResource , Spotify) {

    var self = this;
    var vm = this;
    self.newLocation = new LocationResource();
    self.autocomplete = { types: ['geocode'] }
    self.selectedSong = 0;

    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

  self.songClicked = function($index) {
    self.selectedSong = $index;
  }

  self.placeChanged = function() {

        var place = this.getPlace();

        console.log('location', place.geometry.location);
        self.map.setCenter(place.geometry.location);
        self.newLocation.location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
      } 
  }

  self.saveLocation = function() {

      self.newLocation.$save(function(){

          console.log(self.newLocation);
          console.log('location saved');

      });
  }

    this.searchSpotify = function(){
      Spotify.search(self.artistName, 'track').then(function (data) {
        self.selectedArtist = data;
      });
    }

    this.selectTrack = function(track){
        console.log(track)
      self.newLocation.song = {
        spotID : track.id
      }
      console.log("selected");
    }

    vm.style = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}];
} //END