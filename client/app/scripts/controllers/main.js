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
    $scope.articles = [];

    var startPoint = 0;
    var NumberOfArticles = 2;
    var articleRange = [startPoint, NumberOfArticles];

    $scope.getArticles = function () {
      startPoint = 0;
      NumberOfArticles = 2;
      articleRange = [startPoint, NumberOfArticles];

      getAndPostArticlesService.getArticles($scope.search, articleRange).then(function (returnedArticles) {
        $scope.articles = returnedArticles.data;
      });
    };


    $scope.getMoreArticles = function () {
      $scope.loading = true;
      getAndPostArticlesService.getArticles($scope.search, articleRange).then(function (returnedArticles) {
        $scope.articles = $scope.articles.concat(returnedArticles.data);
        startPoint += NumberOfArticles;
        articleRange = [startPoint,NumberOfArticles];
        $scope.loading = false;
      });
    };

    $scope.search = {};
    $scope.quantity = 20;
    $scope.getArticles();

  });
