'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('MainCtrl', function ($scope, getAndPostArticlesService) {
    $scope.getArticles = function () {
      getAndPostArticlesService.getArticles($scope.search).then(function(returnedArticles){
        $scope.articles = returnedArticles;
        console.log($scope.articles);
      });

    };
    $scope.search = {};
    $scope.quantity = 20;
    $scope.getArticles();
  });
