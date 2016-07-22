angular.module('project4')
.controller('NewController' , NewController);


NewController.$inject = ['NgMap', 'LocationResource' ,'Spotify'];

  function NewController(NgMap, LocationResource , Spotify) {

    var self = this;

    self.newLocation = new LocationResource();
    self.autocomplete = { types: ['geocode'] }
    self.selectedSong = 0;

  self.songClicked = function($index) {
    self.selectedSong = $index;
  }

  self.placeChanged = function() {

        var place = this.getPlace();

        console.log('location', place.geometry.location);

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
} //END