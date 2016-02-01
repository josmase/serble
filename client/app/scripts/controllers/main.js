'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('MainCtrl', function ($scope,getArticlesService) {
    $scope.getArticles = function () {
      $scope.articles = getArticlesService.getArticles($scope.search.text,$scope.search.category);
     console.log($scope.articles);
    };
    $scope.search = {};
    $scope.quantity = 20;
    //$scope.getArticles();
  })
  .service('getArticlesService', function ($http) {
  this.getArticles = function (title,category) {
    this.title = title;
    this.category = category;
    $http({
      method: 'GET',
      url: 'http://172.16.0.237:3000/articles/get',
      dataType: 'json',
      params: {'filterTitle': this.title, 'filterCategory': this.category}
    }).then(function successCallback(response) {
      console.log(response);
      return response
    }, function errorCallback(response) {
      console.log(response);
      return response;
    });
  }
});

