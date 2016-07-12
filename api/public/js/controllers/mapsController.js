angular.module('project4')
  .controller('MapsController', MapsController);

  MapsController.$inject = ["uiGmapGoogleMapApi", '$scope']
  function MapsController(uiGmapGoogleMapApi, $scope){

   var self = this;
             // initial map data
             self.map = {
                 center: { 
                   latitude: 51.5073509, 
                   longitude: -0.12775829999998223 
                 },
                 zoom: 12, 
                 control:{},
                 searchbox: { 
                          template:'searchbox.tpl.html', 
                          events:{
                            places_changed: function (searchBox) {

                            }
                          }
                        },
                 options: 
                 {
                   scrollwheel: true
                 }
      };

     var events = {
              place_changed:function (searchBox) {
                  var place = searchBox.getPlace();
                  if (!place || place == 'undefined') {
                      console.log('no place data :(');
                      return;
                  }

                  // refresh the map
                  $scope.map = {
                      center:{
                          latitude:place[0].geometry.location.lat(),
                          longitude:place[0].geometry.location.lng()
                      },
                      zoom:18
                  };

                  // refresh the marker
                  $scope.marker = {
                      id:0,
                      options:{ draggable:false },
                      coords:{
                          latitude:place[0].geometry.location.lat(),
                          longitude:place[0].geometry.location.lng()
                      }
                  };

              }
          };

          $scope.searchbox = {events: events};
  }



