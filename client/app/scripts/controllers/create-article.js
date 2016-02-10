'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateArticleCtrl
 * @description
 * # CreateArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('CreateArticleCtrl', function ($scope, geocodeService, getAndPostArticlesService) {
    $scope.submitForm = function () {
      $scope.loading = true;
      geocodeService.geocode($scope.articleData).then(function (response) {
        $scope.articleData.latitude = response.data.results[0].geometry.location.lat;
        $scope.articleData.longitude = response.data.results[0].geometry.location.lng;
        $scope.articleData.neighborhood = response.data.results[0].address_components[1].long_name;
        postArticle()
      });
    };

    function postArticle() {
      getAndPostArticlesService.postArticleData($scope.articleData)
        .then(function successCallback(response) {
          $scope.loading = false;
        }, function errorCallback(response) {
          $scope.loading = false;
        });
    }
  });


