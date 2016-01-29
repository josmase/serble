'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.getArticles = function(){

    $http({
      method: 'GET',
      url: 'http://172.16.0.237:3000/articles/get',
      dataType: 'json',
      params: {'text':$scope.search.text,'order':$scope.search.order,'category':$scope.search.category}
    }).then(function successCallback(response) {
     console.log(response);
      $scope.articles = response
    }, function errorCallback(response) {
      console.log(response);
      $scope.articles = response;
    });
  };


    $scope.quantity = 20;

  }]);

