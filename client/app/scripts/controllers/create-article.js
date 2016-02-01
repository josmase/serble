'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateArticleCtrl
 * @description
 * # CreateArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('CreateArticleCtrl', function ($scope, submitFormService) {
    $scope.articleData = null;
    $scope.submitForm = function () {
      console.log($scope.articleData);
      submitFormService.geocode($scope.articleData).then(function(data){
        $scope.articleData.location = data.data.results[0].geometry.location;
        submitFormService.postFormData($scope.articleData);
      });
    };

  })
  .service('submitFormService', function ($http, $q) {
    this.postFormData = function (articleData) {
      this.articleData = articleData;
      $http({
        method: 'POST',
        url: 'http://172.16.0.237:3000/articles/create',
        dataType: 'json',
        data: {
          'user_id': 0,
          'title': this.articleData.title,
          'description': this.articleData.description,
          'payout': this.articleData.price,
          'category': this.articleData.category
        }
      }).then(function successCallback(response) {
        console.log(response);
        return response;
      }, function errorCallback(response) {
        console.log('error' + response);
        return response;
      });
    };
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

