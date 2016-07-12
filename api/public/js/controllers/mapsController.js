angular.module('project4')
  .controller('MapsController', MapsController);

  MapsController.$inject = ['ngMap', '$scope']
  function MapsController(ngMap, $scope){

    // var self = this;
    

    // self.types = "['establishment']";
    //   self.placeChanged = function() {
    //     self.place = this.getPlace();
    //     console.log('location', self.place.geometry.location);
    //     self.map.setCenter(self.place.geometry.location);
    //   }

        var vm = this;
        vm.placeChanged = function() {
          // console.log("RUnning")
          vm.place = this.getPlace();
          console.log(vm.place)
          console.log('location', vm.place.geometry.location);
          vm.map.setCenter(vm.place.geometry.location);
        }
        NgMap.getMap().then(function(map) {
          vm.map = map;
        });
 } 