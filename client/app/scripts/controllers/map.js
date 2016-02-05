'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAz9VB62M7bhTVi5qmToMnrqdbQjq5Xugk',
      v: '3.18',
      libraries: 'weather,geometry,visualization'
    });
  })
  .controller('MapCtrl', function ($scope, uiGmapGoogleMapApi, myMapServices, $filter, getAndPostArticlesService) {
    $scope.markers = [
      {
        id: 1,
        latitude: 63.8233639,
        longitude: 20.2642868,
        title: 'Gräs',
        zipCode: 90364,
        payout: 200,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        locationDistance: 3000
      },
      {
        id: 2,
        latitude: 64.8233639,
        longitude: 20.2642868,
        title: 'Laga min bil',
        zipCode: 90364,
        payout: 200,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        locationDistance: 500
      },
      {
        id: 3,
        latitude: 65.8233639,
        longitude: 20.2642868,
        title: 'Laga mat',
        zipCode: 90364,
        payout: 20,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        locationDistance: 500
      },
      {
        id: 4,
        latitude: 66.8233639,
        longitude: 20.2642868,
        title: 'Hundvakt',
        zipCode: 9034,
        payout: 2900,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        locationDistance: 500
      }
    ];

    $scope.getArticles = function () {
      $scope.articles = getAndPostArticlesService.getArticles();
      console.log($scope.articles);
    };
    $scope.getArticles();

    $scope.showClickedArticle = function (clickedMarker, eventName, shortInfoClickedMarker) {
      var articleId = shortInfoClickedMarker.zipCode;
      $scope.clickedArticle = $filter('filter')($scope.markers, {zipCode: articleId});
    };

    myMapServices.getCurrentLocation().then(function (data) {
        $scope.map.center = data;

      }
    );
    uiGmapGoogleMapApi.then(function (maps) {

      $scope.map = {
        center: {
          latitude: 63.8233639,
          longitude: 20.2642868
        },
        zoom: 10,
        bounds: {},
        options: {}
      };
      $scope.map.options = myMapServices.getMapOptions().mapOptions;


      //$scope.map.center = $scope.myCurrentLocation;
      if (typeof _.contains === 'undefined') {
        _.contains = _.includes;
      } //else it exists and we good for lodash3 without doing anything else
    });
  })
  .service('myMapServices', function ($http, $q) {

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
          styles: [
            {
              "featureType": "administrative.land_parcel",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "simplified"
                },
                {
                  "lightness": 20
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "hue": "#f49935"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "simplified"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "hue": "#fad959"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [
                {
                  "visibility": "simplified"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "simplified"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                {
                  "hue": "#a1cdfc"
                },
                {
                  "saturation": 30
                },
                {
                  "lightness": 49
                }
              ]
            }
          ]
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
  })
  .filter('distance', function () {
  return function (input) {
    if (input >= 1000) {
      return (input/1000).toFixed(2) + 'km';
    } else {
      return input + 'm';
    }
  }
});
