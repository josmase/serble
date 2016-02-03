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
  .controller('MapCtrl', function ($scope, uiGmapGoogleMapApi, myMapServices, $filter,getAndPostArticlesService) {
    $scope.markers = [
      {
        id: 1,
        latitude: 63.8233639,
        longitude: 20.2642868,
        title: 'a'
      },
      {
        id: 2,
        latitude: 64.8233639,
        longitude: 20.2642868,
        title: 'b'
      },
      {
        id: 3,
        latitude: 65.8233639,
        longitude: 20.2642868,
        title: 'c'
      },
      {
        id: 4,
        latitude: 66.8233639,
        longitude: 20.2642868
      }
    ];

    $scope.getArticles = function () {
      $scope.articles = getAndPostArticlesService.getArticles($scope.search);
      console.log($scope.articles);
    };
    $scope.getArticles();

    $scope.showClickedArticle = function (clickedMarker, eventName, shortInfoClickedMarker) {
      var articleId = shortInfoClickedMarker.id;
      $scope.clickedArticle = $filter('filter')($scope.markers, {id: articleId})[0];
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
          }]
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
  });
