'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateArticleCtrl
 * @description
 * # CreateArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('CreateArticleCtrl', function ($scope, geocodeService) {
    $scope.articleData = null;
    $scope.submitForm = function () {
      console.log($scope.articleData);
      geocodeService.geocode($scope.articleData).then(function(data){
        $scope.articleData.location = data.data.results[0].geometry.location;
        getAndPostArticlesService.postArticleData($scope.articleData);
      });
    };

  })
  .service('geocodeService', function ($http, $q) {
    this.geocode = function (articleData) {
      var deferred = $q.defer();
      this.zipCode = articleData.zipCode;
      this.city = articleData.city;
      $http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.zipCode + ',' + this.city + '&key=AIzaSyAz9VB62M7bhTVi5qmToMnrqdbQjq5Xugk',
        dataType: 'json'
      }).then(function successCallback(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }
  });

