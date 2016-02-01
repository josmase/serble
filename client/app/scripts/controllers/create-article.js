'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateArticleCtrl
 * @description
 * # CreateArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('CreateArticleCtrl', function ($scope,submitFormService) {
    $scope.articleData = null;
    $scope.submitForm = function () {
      submitFormService.postFormData($scope.articleData);

    };
  })
  .service('submitFormService', function($http){
    this.postFormData = function(articleData){
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
        $scope.error = response;
      }, function errorCallback(response) {
        console.log('error' + response);
        $scope.error = response;
      });
    }
  });

