'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('ArticleCtrl', ['$scope', '$routeParams','$http', function ($scope, $routeParams, $http) {

    $scope.articleId = $routeParams.articleId;
    $scope.getArticleInfo = function(){

      $http({
        method: 'GET',
        url: 'http://172.16.0.237:3000/articles/get',
        dataType: 'json',
        params:{'id':$scope.articleId}
      }).then(function successCallback(response) {
        console.log(response);
        $scope.articleInfo = response
      }, function errorCallback(response) {
        console.log(response);
        $scope.articles = response;
      });
    };
  }]);
