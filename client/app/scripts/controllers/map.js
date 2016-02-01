'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp').
config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyAz9VB62M7bhTVi5qmToMnrqdbQjq5Xugk',
    v: '3.18',
    libraries: 'weather,geometry,visualization'
  });
})
  .controller('MapCtrl', function($scope, uiGmapGoogleMapApi, myAppServices) {
  $scope.myCurrentLocation = {};

  myAppServices.getCurrentLocation()
    .then(function(myCurrentLocation){
      console.log('myCurrentLocation', myCurrentLocation);
      $scope.myCurrentLocation = myCurrentLocation;
    })
    .then(function(){return uiGmapGoogleMapApi})
    .then(function(maps){
      console.log('maps', maps);
      $scope.googlemap = {};
      $scope.map = {
        center: {        // set on San Francisco as initial default
          latitude: 37.7749295,
          longitude: -122.4194155
        },
        zoom: 13,
        pan: 1,
        options: myAppServices.getMapOptions().mapOptions,
        control: {},
        events: {
          tilesloaded: function (maps, eventName, args) {
            console.log('The ' + eventName + ' function fires every time you move or zoom the map');
          },
          dragend: function (maps, eventName, args) {
            console.log('The ' + eventName + ' function fires every time you drag the map');
          },
          zoom_changed: function (maps, eventName, args) {
            console.log('The ' + eventName + ' function fires every time you zoom');
          }
        }
      };
      $scope.map.center = $scope.myCurrentLocation;
      console.log('maps', maps.LatLngBounds);
      /*   this section of code won't run because maps is not defined at this point
       $scope.mapBounds = maps.Map.getBounds();
       $scope.center = $scope.mapBounds.getCenter();
       $scope.currentLocation = {lat : $scope.center.lat(), lng : $scope.center.lng()};
       console.log('$scope.currentLocation', $scope.currentLocation);
       */
      console.log('function i want to run ONCE after initial map load...');
    })
})
.service('myAppServices', function($http, $q, uiGmapGoogleMapApi) {
  /*
   * Function to return map options - used in $scope.map in controller
   */
  this.getMapOptions = function(){
    return{
      mapOptions : {
        minZoom : 3,
        zoomControl : false,
        draggable : true,
        navigationControl : false,
        mapTypeControl : false,
        scaleControl : false,
        streetViewControl : false,
        mapTypeId : google.maps.MapTypeId.HYBRID,
        disableDoubleClickZoom : false,
        keyboardShortcuts : true,
        styles : [{
          featureType : "poi",
          elementType : "labels",
          stylers : [{
            visibility : "off"
          }]
        }, {
          featureType : "transit",
          elementType : "all",
          stylers : [{
            visibility : "off"
          }]
        }],
      }
    };
  };
  this.getCurrentLocation = function(){
    var deferred = $q.defer();
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('position.coords :', position.coords);
      var myCurrentLocation = {
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
      };
      deferred.resolve(myCurrentLocation);
    });
    return deferred.promise;
  };
});
