angular.module('project4')
  .controller('TracksController', TracksController);

  TracksController.$inject = ["$http"]
  function TracksController($http){
   
    var self = this;

         this.selectedTrack = 

         $http({
           method: 'GET',
           url: 'https://api.spotify.com/v1/search?q=adele&type=album,track,artist'
         }).then(function successCallback(response) {

             self.results = response.data;
             console.log(self.results);

           }, function errorCallback(response) {
               console.log(response);
           });

         this.selectTrack = function(id) {

             this.selectedTrack = id;
             console.log(id)

         }

  }