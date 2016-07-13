angular.module('project4')
  .controller('MapsController', MapsController);

  MapsController.$inject = ['NgMap', '$scope']
  function MapsController(NgMap, $scope){

    // var self = this;
    

    // self.types = "['establishment']";
    //   self.placeChanged = function() {
    //     self.place = this.getPlace();
    //     self.map.setCenter(self.place.geometrypglg[o§.location);
    //   }

        // var vm = this;
        // vm.placeChanged = function() {
        //   // console.log("RUnning")
        //   vm.place = this.getPlace();§§§
        //   console.log(vm.place)
        //   console.log('location', vm.place.geometry.location);
        //   vm.map.setCenter(vm.place.geome§try.location);
        // }
        // ngMap.getMap().then(function(map) {
        //   vm.map = map;
        // });
         var vm = this;

         vm.placeChanged = function() {
          console.log("Running")
           vm.place = this.getPlace();
           console.log('location', vm.place.geometry.location);
           vm.map.setCenter(vm.place.geometry.location);
         }
         NgMap.getMap().then(function(map) {
           vm.map = map;
         });
 } 