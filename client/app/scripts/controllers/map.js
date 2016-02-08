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
        neighborhood: 'Umedalen'
      },
      {
        id: 2,
        latitude: 64.8233639,
        longitude: 20.2642868,
        title: 'Laga min bil',
        zipCode: 90364,
        payout: 200,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        neighborhood: 'Umedalen'
      },
      {
        id: 3,
        latitude: 65.8233639,
        longitude: 20.2642868,
        title: 'Laga mat',
        zipCode: 90364,
        payout: 20,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        neighborhood: 'Umedalen'
      },
      {
        id: 4,
        latitude: 66.8233639,
        longitude: 20.2642868,
        title: 'Hundvakt',
        zipCode: 9034,
        payout: 2900,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        neighborhood: 'Umedalen'
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


      //$scope.map.center = $scope.myCurrentLocation;
      if (typeof _.contains === 'undefined') {
        _.contains = _.includes;
      } //else it exists and we good for lodash3 without doing anything else
    });
  });

