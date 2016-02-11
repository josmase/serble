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

    getAndPostArticlesService.getArticles($scope.search).then(function (returnedArticles) {
      $scope.markers = returnedArticles.data;

    });

    $scope.showClickedArticle = function (clickedMarker, eventName, shortInfoClickedMarker) {
      var zipcode = shortInfoClickedMarker.zipcode;
      $scope.clickedArticle = $filter('filter')($scope.markers, {zipcode: zipcode});
    };

    myMapServices.getCurrentLocation().then(function (data) {
        $scope.map.center = data;
      }
    );
    uiGmapGoogleMapApi.then(function () {

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


      $scope.map.center = $scope.myCurrentLocation;
      if (typeof _.contains === 'undefined') {
        _.contains = _.includes;
      } //else it exists and we good for lodash3 without doing anything else
    });
  });

