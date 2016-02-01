'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp').config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAz9VB62M7bhTVi5qmToMnrqdbQjq5Xugk',
      v: '3.18',
      libraries: 'weather,geometry,visualization'
    });
  })
  .controller('MapCtrl', function ($scope, uiGmapGoogleMapApi) {

    var createRandomMarker = function (i, bounds, idKey) {
      var lat_min = bounds.southwest.latitude,
        lat_range = bounds.northeast.latitude - lat_min,
        lng_min = bounds.southwest.longitude,
        lng_range = bounds.northeast.longitude - lng_min;

      if (idKey == null) {
        idKey = "id";
      }

      var latitude = lat_min + (Math.random() * lat_range);
      var longitude = lng_min + (Math.random() * lng_range);
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: 'm' + i
      };
      ret[idKey] = i;
      return ret;
    };
    $scope.randomMarkers = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function () {
      return $scope.map.bounds;
    }, function (nv, ov) {
      // Only need to regenerate once
      if (!ov.southwest && nv.southwest) {
        var markers = [];
        for (var i = 0; i < 50; i++) {
          markers.push(createRandomMarker(i, $scope.map.bounds))
        }
        $scope.randomMarkers = markers;
      }
    }, true);
    uiGmapGoogleMapApi.then(function (maps) {
      $scope.map = {
        center: {
          latitude: 40.1451,
          longitude: -99.6680
        },
        zoom: 4,
        bounds: {},
        options: {
          scrollwheel: false
        }
      };

      if (typeof _.contains === 'undefined') {
        _.contains = _.includes;
      } //else it exists and we good for lodash3 without doing anything else
    });
  });
/* .service('myMapServices', function ($http, $q, uiGmapGoogleMapApi) {
 /!*
 * Function to return map options - used in $scope.map in controller
 *!/
 this.getMapOptions = function () {
 return {
 mapOptions: {
 minZoom: 3,
 zoomControl: false,
 draggable: true,
 navigationControl: false,
 mapTypeControl: false,
 scaleControl: false,
 streetViewControl: false,
 mapTypeId: google.maps.MapTypeId.ROADMAP,
 disableDoubleClickZoom: false,
 keyboardShortcuts: true,
 styles: [{
 featureType: "poi",
 elementType: "labels",
 stylers: [{
 visibility: "off"
 }]
 }, {
 featureType: "transit",
 elementType: "all",
 stylers: [{
 visibility: "off"
 }]
 }],
 }
 };
 };
 this.getCurrentLocation = function () {
 var deferred = $q.defer();
 navigator.geolocation.getCurrentPosition(function (position) {
 console.log('position.coords :', position.coords);
 var myCurrentLocation = {
 latitude: position.coords.latitude,
 longitude: position.coords.longitude
 };
 deferred.resolve(myCurrentLocation);
 });
 return deferred.promise;
 };
 });*/
