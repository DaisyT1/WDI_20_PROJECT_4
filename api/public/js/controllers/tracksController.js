angular.module('project4')
  .controller('TracksController', TracksController);

  TracksController.$inject = ["$http" , "$sce"];
  function TracksController($http , $sce){
   
    var self = this;
    self.eg = '3rgsDhGHZxZ9sB9DQWQfuf';

         this.selectedTrack = $sce.trustAsResourceUrl('https://embed.spotify.com/?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf');

         $http({
           method: 'GET',
           url: 'https://api.spotify.com/v1/search?q=beyonce&type=album,track,artist'
         }).then(function successCallback(response) {

             self.results = response.data;
             // console.log(self.results);

           }, function errorCallback(response) {
               // console.log(response);
           });

         this.selectTrack = function(id) {

             this.selectedTrack = id;
             // console.log(id)

         }

  }