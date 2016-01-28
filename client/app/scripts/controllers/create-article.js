'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateArticleCtrl
 * @description
 * # CreateArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('CreateArticleCtrl', function ($scope, $http) {
    $scope.articleData = null;
    $scope.submitForm = function () {
      $http({
        method: 'POST',
        url: 'http://172.16.0.237:3000/articles/create',
        dataType: 'json',
        data: {
          'user_id': 0,
          'title': $scope.articleData.title,
          'description': $scope.articleData.description,
          'payout': $scope.articleData.price,
          'category': $scope.articleData.category
        }
      }).then(function successCallback(response) {
        console.log(response);
        $scope.error = response
      }, function errorCallback(response) {
        console.log("error" + response);
        $scope.error = response
      });

    };
  });
